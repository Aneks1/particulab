export { default as HEX } from "./structures/Colors/HEX";
export { default as RGBA } from "./structures/Colors/RGBA";
import Particle from "./structures/Particle";
export { Particle as Particle };
export { default as ParticleSystem } from "./structures/ParticleSystem";
export { default as range } from "./utils/range";
import ParticleImage from "./structures/ParticleImage";
export { ParticleImage as ParticleImage };
export { default as ShapeManager } from './structures/ShapeManager';
export { default as Plugin } from './structures/Plugin';
export declare type Interval = {
    min: number;
    max: number;
};
export declare type VectorInterval = {
    x: Interval;
    y: Interval;
};
export declare type Vector = {
    x: number;
    y: number;
};
export declare type Shape = 'circle' | 'rectangle' | 'triangle' | 'star' | ParticleImage;
export declare type ParticleUpdateCallback = (particle: Particle, deltaTime: number) => void;
