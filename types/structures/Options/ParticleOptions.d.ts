import HEX from "../Colors/HEX";
import RGBA from "../Colors/RGBA";
import FadeOptions from "./FadeOptions";
import { vector, shapes } from "../..";
export default interface ParticleOptions {
    size?: number;
    life?: number;
    speed?: vector;
    color?: RGBA | HEX;
    opacity?: number;
    fadeOut?: FadeOptions;
    fadeIn?: FadeOptions;
    shape: shapes;
}
