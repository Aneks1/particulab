export type interval = { min: number, max: number }
export type vectorInterval = { x: interval, y: interval }
export type vector = { x: number, y: number }

export interface FadeOptions { duration: number, opacity?: number, scaleFactor?: number }

export class Particle {
    private parent: ParticleSystem
    private readonly id: string
    public position: vector
    public diameter: number
    public life: number
    public speed: vector
    public color: RGBA | HEX
    public opacity: number
    public fadeOut?: FadeOptions
    public fadeIn?: FadeOptions
    private fadeOutHandler?: FadeOutHandler
    private fadeInHandler?: FadeInHandler
    public init(): void
    constructor(id: string, parent: ParticleSystem)
}

export class ParticleSystem {
    private canvas: HTMLCanvasElement
    private canvasSize: vector
    private lastId: number
    public deltaTime: number
    public amount: number
    public particles: Map<string, Particle>
    public size: interval
    public life: interval
    public speed: vectorInterval
    public colors: (RGBA | HEX)[]
    public opacity: interval
    public fadeOut?: FadeOptions
    public fadeIn?: FadeOptions
    public init(): void
    constructor(canvas: HTMLCanvasElement, size: vector)
}

export class FadeHandler {
    public parent: Particle
    public options: FadeOptions
    public deltaSize: number
    public deltaOpacity: number
    constructor(parent: Particle, options: FadeOptions)
}

export class FadeOutHandler extends FadeHandler {
    constructor(parent: Particle, options: FadeOptions)
    public calculateDeltas(): void
}

export class FadeInHandler extends FadeHandler {
    public initialLife: number
    constructor(parent: Particle, options: FadeOptions)
    public calculateDeltas(): void
}

export class RGBA {
    public red: number
    public green: number
    public blue: number
    public alpha: number
    constructor(red: number, green: number, blue: number, alpha: number)
    public toHex(): HEX
    private _componentToHex(c: number): string
    public toString(): string
}

export class HEX {
    public hex: string
    constructor(hex: string)
    public toRGB(): RGBA
    public toString(): string
}

export function range(min: number, max: number): interval