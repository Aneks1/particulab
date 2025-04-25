import { ParticleCreateCallback, ParticleUpdateCallback } from "..";
import ParticleSystem from "./ParticleSystem";

export default interface Plugin {
    id: string
    setup(system: ParticleSystem): unknown
    onParticleUpdate: ParticleUpdateCallback
    onParticleCreate: ParticleCreateCallback
}