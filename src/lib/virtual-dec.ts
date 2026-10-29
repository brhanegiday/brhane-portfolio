/**
 * Layout of the simplified 3D model in the Virtual DEC showcase: nine numbered
 * stations in a U (three per wall) with the visitor entering at the open end.
 *
 * The stations are deliberately anonymous. This portfolio shows the shape of
 * the project, not its content, and uses no models, voices or slides from it.
 */

export type RoomWall = "left" | "back" | "right";

export interface DecStop {
    id: string;
    wall: RoomWall;
    /** Position on the model floor: [x, z]. */
    position: [number, number];
    /** Rotation about the vertical axis, in radians, so the screen faces the room. */
    facing: number;
}

// Colour per wall, shared by the 3D scene and the list beside it.
export const WALL_COLORS: Record<RoomWall, string> = {
    left: "#22d3ee",
    back: "#a78bfa",
    right: "#fb923c",
};

export const WALL_NAMES: Record<RoomWall, string> = {
    left: "Left wing",
    back: "Main hall",
    right: "Right wing",
};

export const decStops: DecStop[] = [
    { id: "station-1", wall: "left", position: [-3.57, 0.68], facing: Math.PI / 2 },
    { id: "station-2", wall: "left", position: [-3.57, -1.02], facing: Math.PI / 2 },
    { id: "station-3", wall: "left", position: [-3.57, -2.72], facing: Math.PI / 2 },
    { id: "station-4", wall: "back", position: [-1.7, -3.74], facing: 0 },
    { id: "station-5", wall: "back", position: [0, -3.74], facing: 0 },
    { id: "station-6", wall: "back", position: [1.7, -3.74], facing: 0 },
    { id: "station-7", wall: "right", position: [3.57, -2.72], facing: -Math.PI / 2 },
    { id: "station-8", wall: "right", position: [3.57, -1.02], facing: -Math.PI / 2 },
    { id: "station-9", wall: "right", position: [3.57, 0.68], facing: -Math.PI / 2 },
];
