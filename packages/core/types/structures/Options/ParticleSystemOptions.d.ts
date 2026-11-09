import HEX from "../Colors/HEX";
import RGBA from "../Colors/RGBA";
import { Interval, Vector, VectorInterval, Shape } from "../..";
import Emitter from "../Emitter";
import { Coordinates } from "../..";
export default interface ParticleSystemOptions {
    canvasSize: Vector;
    amount?: number;
    size?: Interval;
    mass?: Interval;
    lifeSpan?: Interval;
    velocity?: VectorInterval;
    acceleration?: VectorInterval;
    colors?: (RGBA | HEX)[];
    opacity?: Interval;
    shapes?: Shape[];
    emitter?: Emitter<Coordinates>;
}
