import { Particle, ParticleSystem, Plugin } from "@particulab/core";
import FadeOptions from "./FadeOptions";
export default class FadePlugin implements Plugin {
    readonly id: string;
    private readonly options;
    setup(system: ParticleSystem): unknown;
    onParticleUpdate: (particle: Particle, deltaTime: number) => void;
    onParticleCreate: (particle: Particle) => void;
    constructor(options: {
        fadeIn: FadeOptions;
        fadeOut: FadeOptions;
    });
}
