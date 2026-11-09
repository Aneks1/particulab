import HEX from "../Colors/HEX";
import RGBA from "../Colors/RGBA";
import { Shape } from "../..";
import Vector2 from "../Vector2";
export default interface ParticleOptions {
    acceleration?: Vector2;
    mass?: number;
    color?: RGBA | HEX;
    lifeSpan?: number;
    position?: Vector2;
    opacity?: number;
    size?: number;
    shape?: Shape;
    velocity?: Vector2;
}
