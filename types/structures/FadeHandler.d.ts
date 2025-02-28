import FadeOptions from "./Options/FadeOptions";
import Particle from "./Particle";
export default abstract class FadeHandler {
    parent: Particle;
    options: FadeOptions;
    deltaSize: number;
    deltaOpacity: number;
    abstract calculateDeltas(): void;
    constructor(parent: Particle, options: FadeOptions);
}
export declare class FadeOutHandler extends FadeHandler {
    constructor(parent: Particle, options: FadeOptions);
    calculateDeltas(): void;
}
export declare class FadeInHandler extends FadeHandler {
    initialLife: number;
    constructor(parent: Particle, options: FadeOptions);
    calculateDeltas(): void;
}
