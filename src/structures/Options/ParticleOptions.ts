import HEX from "../Colors/HEX"
import RGBA from "../Colors/RGBA"
// import FadeOptions from "./FadeOptions"
import { Vector, Shape, ParticleUpdateCallback } from "../.."

export default interface ParticleOptions {
    position?: Vector
    size?: number
    lifeSpan?: number
    speed?: Vector
    color?: RGBA | HEX
    opacity?: number
    // fadeOut?: FadeOptions
    // fadeIn?: FadeOptions --------- Plugin
    shape?: Shape
    onParticleUpdate?: ParticleUpdateCallback
}