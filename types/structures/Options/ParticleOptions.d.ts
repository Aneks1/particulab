import HEX from "../Colors/HEX";
import RGBA from "../Colors/RGBA";
import { Vector, Shape, ParticleUpdateCallback } from "../..";
export default interface ParticleOptions {
    position?: Vector;
    size?: number;
    lifeSpan?: number;
    speed?: Vector;
    color?: RGBA | HEX;
    opacity?: number;
    shape?: Shape;
    onParticleUpdate?: ParticleUpdateCallback;
}
