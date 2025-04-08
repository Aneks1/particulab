import HEX from "../Colors/HEX";
import RGBA from "../Colors/RGBA";
import { Interval, Vector, VectorInterval, Shape } from "../..";
export default interface ParticleSystemOptions {
    canvasSize: Vector;
    amount?: number;
    size?: Interval;
    lifeSpan?: Interval;
    speed?: VectorInterval;
    acceleration?: VectorInterval;
    colors?: (RGBA | HEX)[];
    opacity?: Interval;
    shapes?: Shape[];
}
