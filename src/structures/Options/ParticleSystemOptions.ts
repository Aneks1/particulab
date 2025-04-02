import HEX from "../Colors/HEX"
import RGBA from "../Colors/RGBA"
// import FadeOptions from "./FadeOptions"
import { Interval, Vector, VectorInterval, Shape, ParticleUpdateCallback } from "../.."

export default interface ParticleSystemOptions {
    canvasSize: Vector
    amount?: number
    size?: Interval
    lifeSpan?: Interval
    speed?: VectorInterval
    colors?: (RGBA | HEX)[]
    opacity?: Interval
    // fadeOut?: FadeOptions
    // fadeIn?: FadeOptions, ------- Plugin
    shapes?: Shape[],
    onParticleUpdate?: ParticleUpdateCallback
}