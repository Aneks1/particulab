import HEX from "../Colors/HEX";
import RGBA from "../Colors/RGBA";
import FadeOptions from "./FadeOptions";
import { Interval, Vector, VectorInterval, Shape } from "../..";
export default interface ParticleSystemOptions {
    canvasSize: Vector;
    amount?: number;
    size?: Interval;
    life?: Interval;
    speed?: VectorInterval;
    colors?: (RGBA | HEX)[];
    opacity?: Interval;
    fadeOut?: FadeOptions;
    fadeIn?: FadeOptions;
    shapes?: Shape[];
}
