export type interval = { min: number, max: number }
export type vectorInterval = { x: interval, y: interval }
export type vector = { x: number, y: number }
export type fadeTypes = "opacity" | "scale" | "opacity-scale"

export interface FadeOptions { duration: number }
export interface OpacityFadeOptions extends FadeOptions { targetOpacity: number }
export interface ScaleFadeOptions extends FadeOptions { targetScaleFactor: number }
export interface OpacityScaleFadeOptions extends OpacityFadeOptions, ScaleFadeOptions {}

export class Particle {
    private parent: ParticleSystem
    private readonly id: string
    public position: vector
    public diameter: number
    public life: number
    public speed: vector
    public init(): void
    public color: RGBA | HEX
    public opacity: number
    public fadeOut: {
        type: fadeTypes | null,
        options: OpacityFadeOptions | ScaleFadeOptions | OpacityScaleFadeOptions | null
    }
    private deltaDiameter: number
    private deltaOpacity: number
    constructor(id: string, parent: ParticleSystem)
}

export class ParticleSystem {
    private canvas: HTMLCanvasElement
    private size: vector
    private lastId: number
    public deltaTime: number
    public ammount: number
    public particles: Map<string, Particle>
    public diameter: interval
    public life: interval
    public speed: vectorInterval
    public colors: (RGBA | HEX)[]
    public opacity: interval
    private fadeOut: {
        type: fadeTypes | null,
        options: OpacityFadeOptions | ScaleFadeOptions | OpacityScaleFadeOptions | null
    }
    public static getRandomNumberInInterval(invterval: interval): number
    public static getRandomElementFromArray<T>(arr: T[]): T
    private createParticle(): void
    public setFadeOutType<T extends fadeTypes>(type: T, options:    T extends "opacity" ? OpacityFadeOptions :
                                                                    T extends "scale" ? ScaleFadeOptions :
                                                                    T extends "opacity-scale" ? OpacityScaleFadeOptions : never): void 
    public init(): void
    constructor(canvas: HTMLCanvasElement, size: vector)
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