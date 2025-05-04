import HEX from "../Colors/HEX";
import RGBA from "../Colors/RGBA";
import { Vector, Shape } from "../..";
export default interface ParticleOptions {
    acceleration?: Vector;
    color?: RGBA | HEX;
    lifeSpan?: number;
    position?: Vector;
    opacity?: number;
    size?: number;
    shape?: Shape;
    velocity?: Vector;
}
