export { default as HEX } from "./structures/Colors/HEX";
export { default as RGBA } from "./structures/Colors/RGBA";
export { default as Particle } from "./structures/Particle";
export { default as ParticleSystem } from "./structures/ParticleSystem";
export { default as range } from "./utils/range";
export { default as FadeHandler } from "./structures/FadeHandler";
export { FadeInHandler, FadeOutHandler } from "./structures/FadeHandler";
import ParticleImage from "./structures/ParticleImage";
export { ParticleImage as ParticleImage };
export { default as ShapeManager } from './structures/ShapeManager';
export declare type interval = {
    min: number;
    max: number;
};
export declare type vectorInterval = {
    x: interval;
    y: interval;
};
export declare type vector = {
    x: number;
    y: number;
};
export declare type shapes = 'circle' | 'rectangle' | 'triangle' | 'star' | ParticleImage;
