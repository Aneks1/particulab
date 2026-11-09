export { default as HEX } from "./structures/Colors/HEX";
export { default as RGBA } from "./structures/Colors/RGBA";
import Particle from "./structures/Particle";
export { Particle as Particle };
export { default as ParticleSystem } from "./structures/ParticleSystem";
export { default as range } from "./utils/range";
import ParticleImage from "./structures/ParticleImage";
export { ParticleImage as ParticleImage };
export { default as ShapeManager } from './structures/ShapeManager';
export { default as Plugin } from "./structures/Plugin";
export { default as Emitter } from "./structures/Emitter";
export { default as Vector2 } from "./structures/Vector2";
export type Interval = {
    min: number;
    max: number;
};
export type VectorInterval = {
    x: Interval;
    y: Interval;
};
export interface Vector {
    x: number;
    y: number;
}
export type Shape = 'circle' | 'rectangle' | 'triangle' | 'star' | ParticleImage;
export type ParticleUpdateCallback = (particle: Particle, deltaTime: number) => void;
export type ParticleCreateCallback = (particle: Particle) => void;
export type FnInterval = [min: number, max: number];
export type Coordinates = "cartesian" | "polar";
export type Condition = "equal" | "greater" | "lower";
