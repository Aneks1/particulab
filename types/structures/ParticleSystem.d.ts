import HEX from "./Colors/HEX";
import RGBA from "./Colors/RGBA";
import Particle from "./Particle";
import ParticleSystemOptions from "./Options/ParticleSystemOptions";
import { VectorInterval, Shape, Interval } from "..";
import Plugin from "./Plugin";
export default class ParticleSystem {
    private readonly canvas;
    private canvasSize;
    private lastId;
    particles: Map<string, Particle>;
    private _ctx;
    private animationFrameId;
    private lastUpdate;
    private _plugins;
    amount: number;
    life: Interval;
    size: Interval;
    speed: VectorInterval;
    colors: (RGBA | HEX)[];
    opacity: Interval;
    shapes: Shape[];
    private static numberInRange;
    private static elementFromArray;
    installPlugin(plugin: Plugin): void;
    private createParticle;
    init(): void;
    private update;
    stop(): void;
    clear(): void;
    constructor(canvas: HTMLCanvasElement, options: ParticleSystemOptions);
}
