import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface WallLayer {
    id: string;
    name: string;
    isCore: boolean;
    function: string;
    bimClass: string;
    material: string;
    thickness: number;
    lambda: number;
}

export interface WallType {
    id: string;
    name: string;
    type: 'standard' | 'curtain';
    layers: WallLayer[];
    totalThickness: number;
    height: number;
    topBound: string;
    bottomBound: string;
    topOffset: number;
    bottomOffset: number;
    caps: string;
    bimClass: string;
}

export interface SlabLayer {
    id: string;
    name: string;
    isCore: boolean;
    function: string;
    bimClass: string;
    material: string;
    thickness: number;
    lambda: number;
}

export interface SlabType {
    id: string;
    name: string;
    layers: SlabLayer[];
    totalThickness: number;
    datum: 'top' | 'bottom';
    bimClass: string;
}

export interface LineType {
    id: string;
    name: string;
    color: string;
    thickness: number;
    segmentation: number[];
}

export interface BimLevel {
    id: string;
    name: string;
    isStory: boolean;
    elevation: number;
    defaultWallHeight: number;
    cutPlane: number;
}

export interface ScaleSettings {
    type: 'imperial' | 'metric' | 'enlargement' | 'paper';
    value: string;
    precision: number;
    allLayers: boolean;
    scaleText: boolean;
}

export interface ArcConfig {
    creationMode: 'centerRadiusPoints' | 'startChordEnd' | 'startTangentEnd' | 'centerStartEnd';
    lineColor: string;
    opacity: number;
    lineType: string;
    bimClass: string;
}

export interface BimElement {
    id: string;
    category: string;
    name: string;
    level: string;
    bimClass?: string;
    wallTypeId?: string;
    slabTypeId?: string;
    visibility?: 'visible' | 'hidden' | 'xray';
    material: string;
    volume: number;
    area: number;
    color: string;
    lineColor?: string;
    lineType?: string;
    lineWidth?: number;
    fillType?: 'solid' | 'gradient' | 'texture' | 'hatch';
    fillColor2?: string;
    textureUrl?: string;
    hatchType?: string;
    opacity?: number;
    origin?: 'tl' | 'tc' | 'tr' | 'ml' | 'mc' | 'mr' | 'bl' | 'bc' | 'br';
    groupId?: string;
    locked?: boolean;
    geometry: {
        type: 'box' | 'cylinder' | 'line' | 'rectangle' | 'polygon' | 'arc' | 'ifc' | 'slab';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args: [number, number, number] | [number, number, number, number] | [number, number, number, number, number, number] | number[] | any;
        position: [number, number, number];
        rotation?: [number, number, number];
        scale?: [number, number, number];
    };
}


export interface ProjectDocument {
    id: string;
    projectId: string;
    name: string;
    type: string;
    size: number;
    url: string;
    folder: string;
    isFolder: boolean;
    bimRole?: string | null;
    source: 'local' | 'google_drive';
    status: string;
    authorName: string;
    createdAt: string;
    updatedAt?: string;
}

export interface BimClass {
    id: string;
    name: string;
    parentId: string | null;
}

export interface Level {
    id: string;
    name: string;
    isStory: boolean;
    elevation: number;
    defaultWallHeight: number;
    cutPlane: number;
}

export interface SavedView {
    id: string;
    name: string;
    cameraPosition: [number, number, number];
    cameraTarget: [number, number, number];
}

export interface IssueNote {
    id: string;
    elementId: string;
    elementName?: string;
    title: string;
    description: string;
    createdAt: number;
    status: 'open' | 'resolved';
}
