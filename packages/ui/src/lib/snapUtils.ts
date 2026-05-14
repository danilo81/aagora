import * as THREE from 'three';
import type { BimElement } from '../types/types';

interface SnapConfig {
    snapToVertices?: boolean;
    snapToEdges?: boolean;
    snapToGrid?: boolean;
    snapRadius?: number;
}

interface SnapResult {
    point: THREE.Vector3;
    type: string | null;
}

function snapToGrid(point: THREE.Vector3, planeY: number, gridSpacing: number): THREE.Vector3 {
    return new THREE.Vector3(
        Math.round(point.x / gridSpacing) * gridSpacing,
        planeY,
        Math.round(point.z / gridSpacing) * gridSpacing
    );
}

function getElementVertices(el: BimElement): THREE.Vector3[] {
    const geo = el.geometry;
    if (!geo) return [];
    const pos = geo.position as [number, number, number];
    if (geo.type === 'line' && Array.isArray(geo.args) && geo.args.length >= 6) {
        const [x1, y1, z1, x2, y2, z2] = geo.args as number[];
        return [
            new THREE.Vector3(x1 ?? pos[0], y1 ?? pos[1], z1 ?? pos[2]),
            new THREE.Vector3(x2 ?? pos[0], y2 ?? pos[1], z2 ?? pos[2]),
        ];
    }
    return [new THREE.Vector3(pos[0], pos[1], pos[2])];
}

export function getSnappedPoint(
    point: THREE.Vector3,
    elements: BimElement[] | undefined,
    snapConfig: SnapConfig | undefined,
    planeY: number,
    gridSpacing: number | undefined
): SnapResult {
    const cfg = snapConfig ?? {};
    const radius = cfg.snapRadius ?? 0.3;
    const spacing = gridSpacing ?? 1;
    const els = elements ?? [];

    point.y = planeY;

    // Vertex snap
    if (cfg.snapToVertices !== false) {
        let best: THREE.Vector3 | null = null;
        let bestDist = radius;
        for (const el of els) {
            for (const v of getElementVertices(el)) {
                const d = point.distanceTo(v);
                if (d < bestDist) { bestDist = d; best = v; }
            }
        }
        if (best) return { point: best.clone(), type: 'vertex' };
    }

    // Edge center snap
    if (cfg.snapToEdges !== false) {
        let best: THREE.Vector3 | null = null;
        let bestDist = radius;
        for (const el of els) {
            const verts = getElementVertices(el);
            for (let i = 0; i < verts.length - 1; i++) {
                const mid = new THREE.Vector3().addVectors(verts[i]!, verts[i + 1]!).multiplyScalar(0.5);
                const d = point.distanceTo(mid);
                if (d < bestDist) { bestDist = d; best = mid; }
            }
        }
        if (best) return { point: best.clone(), type: 'edgeCenter' };
    }

    // Grid snap
    if (cfg.snapToGrid !== false) {
        return { point: snapToGrid(point, planeY, spacing), type: 'grid' };
    }

    return { point, type: null };
}
