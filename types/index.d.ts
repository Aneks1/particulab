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
    public static getRandomNumberInInterval(invterval: interval): number
    public createParticle(): void
    public init(): void
    constructor(canvas: HTMLCanvasElement, size: vector)
}