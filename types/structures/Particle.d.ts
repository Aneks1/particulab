import HEX from "./Colors/HEX";
import RGBA from "./Colors/RGBA";
import ParticleSystem from "./ParticleSystem";
import FadeOptions from "./Options/FadeOptions";
import ParticleOptions from "./Options/ParticleOptions";
import { vector, shapes } from "..";
export default class Particle {
    private parent;
    private readonly id;
    private animationFramId;
    private lastUpdate;
    private shapeManager;
    position: vector;
    size: number;
    life: number;
    speed: vector;
    color: RGBA | HEX;
    opacity: number;
    shape: shapes;
    fadeOut?: FadeOptions;
    fadeIn?: FadeOptions;
    private fadeOutHandler?;
    private fadeInHandler?;
    init(): void;
    private update;
    private delete;
    draw(ctx: CanvasRenderingContext2D): void;
    constructor(id: string, parent: ParticleSystem, options?: ParticleOptions);
}
