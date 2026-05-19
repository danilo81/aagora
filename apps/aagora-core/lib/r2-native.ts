import { getCloudflareContext } from '@opennextjs/cloudflare';

interface R2Bucket {
  put(key: string, value: any, options?: { httpMetadata?: { contentType?: string } }): Promise<any>;
  get(key: string): Promise<any>;
  delete(key: string): Promise<any>;
}

interface CloudflareEnv extends Record<string, unknown> {
  AAGORA_ARCHIVOS?: R2Bucket;
  AAGORA_PUBLIC?: R2Bucket;
}

/**
 * Upload a file to Cloudflare R2.
 * Uses native Cloudflare Workers R2 bindings if available (production Edge),
 * otherwise falls back to AWS S3 client using lazy-loaded SDK.
 */
export async function putR2Object(
  key: string,
  body: any,
  contentType: string,
  isPublic: boolean = false
): Promise<void> {
  try {
    const ctx = (await getCloudflareContext()) as any;
    const binding = isPublic ? ctx.env?.AAGORA_PUBLIC : ctx.env?.AAGORA_ARCHIVOS;
    if (binding) {
      console.log(`[R2 Native] Uploading to binding: ${isPublic ? 'AAGORA_PUBLIC' : 'AAGORA_ARCHIVOS'} | Key: ${key}`);
      await binding.put(key, body, {
        httpMetadata: { contentType }
      });
      return;
    }
  } catch (err) {
    console.log('[R2 Native] Cloudflare binding not available, falling back to AWS SDK');
  }

  // Fallback to AWS SDK (e.g. during local dev next dev)
  const { PutObjectCommand } = await import('@aws-sdk/client-s3');
  const { getS3Client } = await import('./s3-client');
  const bucket = isPublic
    ? (process.env.CLOUDFLARE_R2_BUCKET_NAME_PUBLIC || process.env.CLOUDFLARE_R2_BUCKET_NAME!)
    : process.env.CLOUDFLARE_R2_BUCKET_NAME!;

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      Body: body
    })
  );
}

/**
 * Delete a file from Cloudflare R2.
 * Uses native Cloudflare Workers R2 bindings if available (production Edge),
 * otherwise falls back to AWS S3 client using lazy-loaded SDK.
 */
export async function deleteR2Object(key: string, isPublic: boolean = false): Promise<void> {
  try {
    const ctx = (await getCloudflareContext()) as any;
    const binding = isPublic ? ctx.env?.AAGORA_PUBLIC : ctx.env?.AAGORA_ARCHIVOS;
    if (binding) {
      console.log(`[R2 Native] Deleting key: ${key} from binding: ${isPublic ? 'AAGORA_PUBLIC' : 'AAGORA_ARCHIVOS'}`);
      await binding.delete(key);
      return;
    }
  } catch (err) {
    console.log('[R2 Native] Cloudflare binding not available, falling back to AWS SDK');
  }

  // Fallback to AWS SDK (e.g. during local dev next dev)
  const { DeleteObjectCommand } = await import('@aws-sdk/client-s3');
  const { getS3Client } = await import('./s3-client');
  const bucket = isPublic
    ? (process.env.CLOUDFLARE_R2_BUCKET_NAME_PUBLIC || process.env.CLOUDFLARE_R2_BUCKET_NAME!)
    : process.env.CLOUDFLARE_R2_BUCKET_NAME!;

  await getS3Client().send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key
    })
  );
}
