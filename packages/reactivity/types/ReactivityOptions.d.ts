import { ReactionMode } from ".";
import ParticleReactivityOptions from "./ParticleReactivityOptions";
export default interface ReactivityOptions {
    mode: ReactionMode;
    radius: number;
    /**
     * @param strength Force strength when `mode` is `attract` or `repel`.
     */
    strength?: number;
    particleConfig?: ParticleReactivityOptions;
}
