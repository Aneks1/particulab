import HEX from "../Colors/HEX";
import RGBA from "../Colors/RGBA";
import FadeOptions from "./FadeOptions";
import { Vector, Shape } from "../..";
export default interface ParticleOptions {
    size?: number;
    life?: number;
    speed?: Vector;
    color?: RGBA | HEX;
    opacity?: number;
    fadeOut?: FadeOptions;
    fadeIn?: FadeOptions;
    shape: Shape;
}
