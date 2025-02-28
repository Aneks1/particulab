import HEX from "../Colors/HEX"
import RGBA from "../Colors/RGBA"
import FadeOptions from "./FadeOptions"
import { interval, vector, vectorInterval, shapes } from "../.."

export default interface ParticleSystemOptions {
    canvasSize: vector
    amount?: number
    size?: interval
    life?: interval
    speed?: vectorInterval
    colors?: (RGBA | HEX)[]
    opacity?: interval
    fadeOut?: FadeOptions
    fadeIn?: FadeOptions,
    shapes?: shapes[]
}