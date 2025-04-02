import { ParticleUpdateCallback } from "..";
import ParticleSystem from "./ParticleSystem";
export default interface Plugin {
    id: string;
    setup(system: ParticleSystem): unknown;
    applyParticleEffect: ParticleUpdateCallback;
}
