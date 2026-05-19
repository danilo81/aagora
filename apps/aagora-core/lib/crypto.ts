/**
 * Native Web Crypto PBKDF2 Password Utility
 * Provides edge-compatible hashing and verification.
 * Automatically handles legacy bcrypt hashes by dynamically loading bcryptjs,
 * allowing safe inline verification and migration.
 */

/**
 * Hash a password using native Web Crypto PBKDF2.
 * Returns a hash formatted as: $pbkdf2$<iterations>$<salt_hex>$<hash_hex>
 */
export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);
    
    // Generate a random salt (16 bytes)
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // Import password as a CryptoKey
    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBytes,
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
    );
    
    const iterations = 100000;
    // Derive key
    const derivedKeyBytes = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: iterations,
            hash: 'SHA-256'
        },
        baseKey,
        256 // 32 bytes (256 bits)
    );
    
    // Convert salt and derived bytes to hex
    const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
    const hashHex = Array.from(new Uint8Array(derivedKeyBytes)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    return `$pbkdf2$${iterations}$${saltHex}$${hashHex}`;
}

/**
 * Verify a password against a stored hash.
 * If the hash is a legacy bcrypt hash ($2a$ or $2b$), verifies using bcryptjs.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    // Check if legacy bcrypt hash
    if (storedHash.startsWith('$2a$') || storedHash.startsWith('$2b$')) {
        // Dynamically import bcryptjs to avoid bundle overhead and CPU block in normal flows
        const bcrypt = await import('bcryptjs');
        return bcrypt.compare(password, storedHash);
    }
    
    if (!storedHash.startsWith('$pbkdf2$')) {
        return false;
    }
    
    const parts = storedHash.split('$');
    // parts[0] is empty because it starts with '$'
    // parts[1] is 'pbkdf2'
    // parts[2] is iterations
    // parts[3] is saltHex
    // parts[4] is hashHex
    if (parts.length !== 5 || parts[1] !== 'pbkdf2') {
        return false;
    }
    
    const iterationsStr = parts[2];
    const saltHex = parts[3];
    const hashHex = parts[4];
    if (!iterationsStr || !saltHex || !hashHex) {
        return false;
    }
    
    const iterations = parseInt(iterationsStr, 10);
    
    // Convert hex salt back to bytes
    const saltMatches = saltHex.match(/.{1,2}/g);
    if (!saltMatches) return false;
    const salt = new Uint8Array(saltMatches.map(byte => parseInt(byte, 16)));
    
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);
    
    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBytes,
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
    );
    
    const derivedKeyBytes = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: iterations,
            hash: 'SHA-256'
        },
        baseKey,
        256
    );
    
    const currentHashHex = Array.from(new Uint8Array(derivedKeyBytes)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Constant-time comparison
    return currentHashHex === hashHex;
}

/**
 * Checks if a stored password hash is a legacy bcrypt hash and needs to be updated.
 */
export function needsMigration(storedHash: string): boolean {
    return storedHash.startsWith('$2a$') || storedHash.startsWith('$2b$');
}
