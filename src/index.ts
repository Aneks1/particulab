export { default as HEX } from "./structures/Colors/HEX"
export { default as RGBA } from "./structures/Colors/RGBA"
import Particle from "./structures/Particle"
export { Particle as Particle }
export { default as ParticleSystem } from "./structures/ParticleSystem"
export { default as range } from "./utils/range"
// export { default as FadeHandler } from "./structures/FadeHandler"
// export { FadeInHandler, FadeOutHandler } from "./structures/FadeHandler" ----- This will be included in plugins
import ParticleImage  from "./structures/ParticleImage"
export { ParticleImage as ParticleImage }
export { default as ShapeManager } from './structures/ShapeManager'
export { default as Plugin } from './structures/Plugin'

export type Interval = { min: number, max: number }
export type VectorInterval = { x: Interval, y: Interval }
export type Vector = { x: number, y: number }
export type Shape = 'circle' | 'rectangle' | 'triangle' | 'star' | ParticleImage
export type ParticleUpdateCallback = (particle: Particle, deltaTime: number) => void