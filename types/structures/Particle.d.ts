import HEX from "./Colors/HEX";
import RGBA from "./Colors/RGBA";
import ParticleSystem from "./ParticleSystem";
import ParticleOptions from "./Options/ParticleOptions";
import { Vector, Shape, ParticleUpdateCallback } from "..";
export default class Particle {
    private readonly parent;
    private readonly id;
    private animationFramId;
    private shapeManager;
    private _age;
    private updateMethods;
    pluginData: Map<string, Record<string, any>>;
    position: Vector;
    acceleration: Vector;
    size: number;
    readonly lifeSpan: number;
    speed: Vector;
    color: RGBA | HEX;
    opacity: number;
    shape: Shape;
    get age(): number;
    init(): void;
    update(deltaTime: number): void;
    private delete;
    draw(ctx: CanvasRenderingContext2D): void;
    onParticleUpdate(callback: ParticleUpdateCallback): ParticleUpdateCallback;
    constructor(id: string, parent: ParticleSystem, options?: ParticleOptions);
}
