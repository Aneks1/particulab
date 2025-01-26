export type interval = { min: number, max: number }
export type vectorInterval = { x: interval, y: interval }
export type vector = { x: number, y: number }

export class Particle {
    private parent: ParticleSystem
    private readonly id: string
    public position: vector
    public diameter: number
    public life: number
    public speed: vector
    public init(): void
    public color: RGBA | HEX
    constructor(id: string, parent: ParticleSystem)
}

export class ParticleSystem {
    public canvas: HTMLCanvasElement
    public size: vector
    private lastId: number
    public ammount: number
    public particles: Map<string, Particle>
    public diameter: interval
    public life: interval
    public speed: vectorInterval
    public colors: (RGBA | HEX)[]
    public static getRandomNumberInInterval(invterval: interval): number
    public static getRandomElementFromArray<T>(arr: T[]): T
    public createParticle(): void
    public init(): void
    constructor(canvas: HTMLCanvasElement, size: vector)
}

export class RGBA {
    public red: number
    public green: number
    public blue: number
    public alpha: number
    constructor(red: number, green: number, blue: number, alpha: number)
    public toHex(): string
    private _componentToHex(c: number): string
    public toString(): string
}

export class HEX {
    public hex: string
    constructor(hex: string)
    public toRGB(): RGBA
    public toString(): string
}