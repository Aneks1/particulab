import { Particle, ParticleSystem, Plugin, Vector } from "@particulab/core";
import ReactivityOptions from "./ReactivityOptions";
export default class ReactivityPlugin implements Plugin {
    readonly id: string;
    private readonly options;
    private cursorPosition;
    setup(system: ParticleSystem): unknown;
    onParticleUpdate: (particle: Particle, deltaTime: number) => void;
    onParticleCreate: (particle: Particle) => void;
    applyForce(particle: Particle, direction: Vector, mass: number, sign: 1 | -1): void;
    constructor(options: ReactivityOptions);
}
