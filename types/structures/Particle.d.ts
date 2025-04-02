import HEX from "./Colors/HEX";
import RGBA from "./Colors/RGBA";
import ParticleSystem from "./ParticleSystem";
import ParticleOptions from "./Options/ParticleOptions";
import { Vector, Shape } from "..";
export default class Particle {
    private readonly parent;
    private readonly id;
    private animationFramId;
    private shapeManager;
    private _age;
    position: Vector;
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
    constructor(id: string, parent: ParticleSystem, options?: ParticleOptions);
}
