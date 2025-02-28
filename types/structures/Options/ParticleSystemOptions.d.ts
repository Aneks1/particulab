import HEX from "../Colors/HEX";
import RGBA from "../Colors/RGBA";
import FadeOptions from "./FadeOptions";
import ParticleImage from "../ParticleImage";
declare type interval = {
    min: number;
    max: number;
};
declare type vectorInterval = {
    x: interval;
    y: interval;
};
declare type vector = {
    x: number;
    y: number;
};
declare type shapes = 'circle' | 'rectangle' | 'triangle' | 'star' | ParticleImage;
export default interface ParticleSystemOptions {
    canvasSize: vector;
    amount?: number;
    size?: interval;
    life?: interval;
    speed?: vectorInterval;
    colors?: (RGBA | HEX)[];
    opacity?: interval;
    fadeOut?: FadeOptions;
    fadeIn?: FadeOptions;
    shapes?: shapes[];
}
export {};
