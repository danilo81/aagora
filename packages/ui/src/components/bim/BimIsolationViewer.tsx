"use client";

import React, { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { ifcLoader } from '../../lib/ifc';
import { fetchIfcWithCache } from '../../lib/ifc-cache';

interface BimIsolationViewerProps {
    ifcUrl: string;
    targetElementIds: string[]; // ['ifc-0-1234', 'ifc-0-5678']
    onLoadState?: (state: string, progress?: number) => void;
    showXray?: boolean;
}

const xrayMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
});

const highlightMaterial = new THREE.MeshStandardMaterial({
    color: 0x10b981, // Emerald 500
    roughness: 0.2,
    metalness: 0.4,
    side: THREE.DoubleSide
});

interface SpatialNode {
    expressID?: number;
    children?: SpatialNode[];
}

function IsolationEngine({ ifcUrl, targetElementIds, onLoadState, showXray = true }: BimIsolationViewerProps) {
    const { camera } = useThree();
    const [originalModel, setOriginalModel] = useState<THREE.Object3D | null>(null);
    const [xraySubset, setXraySubset] = useState<THREE.Mesh | null>(null);
    const [highlightSubset, setHighlightSubset] = useState<THREE.Mesh | null>(null);

    // Initial load process
    useEffect(() => {
        let isMounted = true;
        
        // Reset state asynchronously to avoid calling setState synchronously within the effect body
        Promise.resolve().then(() => {
            if (isMounted) {
                setOriginalModel(null);
                setXraySubset(null);
                setHighlightSubset(null);
            }
        });

        const loadModel = async () => {
            try {
                // Fetch with IndexedDB cache (instant on second load)
                onLoadState?.('Verificando cachÃ© local...', 0);
                const buffer = await fetchIfcWithCache(ifcUrl, (loaded, total) => {
                    if (total > 0) {
                        const percent = Math.round((loaded / total) * 80);
                        onLoadState?.('Descargando de la Nube...', percent);
                    }
                });

                if (!isMounted) return;
                onLoadState?.('Procesando modelo IFC...', 85);

                // Parse from buffer instead of loading from URL
                const model = await ifcLoader.parse(buffer);

                if (!isMounted) return;
                onLoadState?.('Generando Mallas GeomÃ©tricas...', 90);

                // Hide original model 
                model.visible = false;
                setOriginalModel(model);

                // Auto-center camera around the model
                const box = new THREE.Box3().setFromObject(model);
                const center = new THREE.Vector3();
                box.getCenter(center);
                const size = new THREE.Vector3();
                box.getSize(size);

                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));

                // Keep some distance
                cameraZ *= 1.5;

                camera.position.set(center.x + cameraZ * 0.5, center.y + cameraZ * 0.5, center.z + cameraZ);
                camera.lookAt(center);

                // Process Express IDs
                const expressIdsByModel: Record<number, number[]> = {};
                targetElementIds.forEach(idText => {
                    const parts = idText.split('-');
                    if (parts.length >= 3) {
                        const modelIdText = parts[1];
                        const expressIdText = parts[2];
                        if (modelIdText !== undefined && expressIdText !== undefined) {
                            const modelId = parseInt(modelIdText, 10);
                            const expressId = parseInt(expressIdText, 10);
                            if (!expressIdsByModel[modelId]) {
                                expressIdsByModel[modelId] = [];
                            }
                            const arr = expressIdsByModel[modelId];
                            if (arr) {
                                arr.push(expressId);
                            }
                        }
                    }
                });

                const targetExpressIds = expressIdsByModel[model.modelID] || [];

                // Extract all express IDs to create the full xray subset
                onLoadState?.('Construyendo Vista de Aislamiento...', 95);
                const allSpatialTree = await ifcLoader.ifcManager.getSpatialStructure(model.modelID);

                const allIds: number[] = [];
                const extractIds = (node: SpatialNode) => {
                    if (node.expressID) allIds.push(node.expressID);
                    if (node.children) {
                        node.children.forEach(extractIds);
                    }
                };
                extractIds(allSpatialTree);

                if (!isMounted) return;

                // Exclude targets from XRay so they don't clash (z-fighting)
                const xrayIds = allIds.filter(id => !targetExpressIds.includes(id));

                if (xrayIds.length > 0) {
                    const xrs = ifcLoader.ifcManager.createSubset({
                        modelID: model.modelID,
                        ids: xrayIds,
                        material: xrayMaterial,
                        removePrevious: true,
                        customID: `iso-xray-${model.modelID}`
                    }) as THREE.Mesh;
                    xrs.visible = true;
                    setXraySubset(xrs);
                }

                if (targetExpressIds.length > 0) {
                    const hls = ifcLoader.ifcManager.createSubset({
                        modelID: model.modelID,
                        ids: targetExpressIds,
                        material: highlightMaterial,
                        removePrevious: true,
                        customID: `iso-hl-${model.modelID}`
                    }) as THREE.Mesh;
                    hls.visible = true;
                    setHighlightSubset(hls);

                    // Recenter on highlighted target items if there are any
                    const targetBox = new THREE.Box3().setFromObject(hls);
                    const targetCenter = new THREE.Vector3();
                    targetBox.getCenter(targetCenter);

                    camera.position.set(targetCenter.x + 5, targetCenter.y + 5, targetCenter.z + 10);
                    camera.lookAt(targetCenter);
                }

                onLoadState?.('Completado', 100);

            } catch (err) {
                console.error("Error loading/parsing IFC:", err);
                onLoadState?.('Error cargando modelo', 0);
            }
        };

        loadModel();

        return () => {
            isMounted = false;
        };
    }, [ifcUrl, targetElementIds, camera, onLoadState]);

    return (
        <group>
            {originalModel && <primitive object={originalModel} visible={false} />}
            {xraySubset && <primitive object={xraySubset} dispose={null} visible={showXray} />}
            {highlightSubset && <primitive object={highlightSubset} dispose={null} />}
        </group>
    );
}

export function BimIsolationViewer(props: BimIsolationViewerProps) {
    return (
        <div className="w-full h-full relative bg-card">
            <Canvas
                shadows={{ type: THREE.PCFShadowMap }}
                camera={{ position: [20, 20, 20], fov: 60 }}
                gl={{ preserveDrawingBuffer: false, antialias: true }}
            >
                <color attach="background" args={['#09090b']} />

                <ambientLight intensity={0.6} />
                <directionalLight
                    castShadow
                    position={[50, 100, 50]}
                    intensity={1.5}
                    shadow-mapSize={[2048, 2048]}
                />
                <directionalLight position={[-50, 50, -50]} intensity={0.5} />

                <IsolationEngine {...props} />

                <Grid
                    position={[0, -0.5, 0]}
                    args={[100, 100]}
                    cellSize={1}
                    cellThickness={0.5}
                    cellColor="#3f3f46"
                    sectionSize={5}
                    sectionThickness={1}
                    sectionColor="#52525b"
                    fadeDistance={50}
                />

                <OrbitControls makeDefault minDistance={2} maxDistance={200} />
            </Canvas>
        </div>
    );
}

