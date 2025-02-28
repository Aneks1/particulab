import range from "../utils/range"
import HEX from "./Colors/HEX"
import RGBA from "./Colors/RGBA"
import Particle from "./Particle"
import FadeOptions from "./Options/FadeOptions"
import ParticleSystemOptions from "./Options/ParticleSystemOptions"
import { vectorInterval, vector, shapes, interval } from ".."

export default class ParticleSystem {
    private readonly canvas: HTMLCanvasElement
    private canvasSize: vector
    private lastId = 0
    public particles: Map<string, Particle> = new Map()
    private _ctx: CanvasRenderingContext2D
    private animationFramId!: number

    public amount: number
    public life: interval
    public size: interval
    public speed: vectorInterval
    public colors: (RGBA | HEX)[]
    public opacity: interval
    public fadeOut?: FadeOptions
    public fadeIn?: FadeOptions
    public shapes: shapes[]

    private static numberInRange(invterval: interval) {
        const min = Math.ceil(invterval.min);
        const max = Math.floor(invterval.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private static elementFromArray<T>(arr: T[]): T {
        const randomIndex = Math.floor(Math.random() * arr.length)
        return arr[randomIndex]
    }

    private createParticle() {
        const particle = new Particle(this.lastId.toString(), this)
        particle.position.x = ParticleSystem.numberInRange({ min: 0, max: this.canvasSize.x })
        particle.position.y = ParticleSystem.numberInRange({ min: 0, max: this.canvasSize.y })
        particle.size = ParticleSystem.numberInRange(this.size)
        particle.life = ParticleSystem.numberInRange(this.life)
        particle.speed.x = ParticleSystem.numberInRange(this.speed.x)
        particle.speed.y = ParticleSystem.numberInRange(this.speed.y)
        particle.color = ParticleSystem.elementFromArray(this.colors) || new HEX('fff')
        particle.opacity = ParticleSystem.numberInRange(this.opacity)
        particle.fadeOut = this.fadeOut
        particle.fadeIn = this.fadeIn
        particle.shape = ParticleSystem.elementFromArray(this.shapes) || 'circle'
        particle.init()
        this.particles.set(this.lastId.toString(), particle)
        this.lastId++
    }

    public init() {
        for(let i = 0; i < this.amount; i++) this.createParticle()
        this.update()
    }

    private update() {
        if(this.particles.size < this.amount) for(let i = this.particles.size; i < this.amount; i++) this.createParticle()
        this._ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (const [i, p] of this.particles) p.draw(this._ctx)
        this.animationFramId = requestAnimationFrame(this.update.bind(this))
    }

    public stop() {
        cancelAnimationFrame(this.animationFramId)
    }

    public clear() {
        this._ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.particles = new Map()
    }

    constructor(canvas: HTMLCanvasElement, options: ParticleSystemOptions) {
        this.canvas = canvas
        this.canvasSize = options.canvasSize
        canvas.width = options.canvasSize.x
        canvas.height = options.canvasSize.y
        this._ctx = canvas.getContext('2d')!

        // Set the particle properties
        this.amount = options.amount || 0
        this.life = options.life || range(10, 15)
        this.size = options.size || range(1, 5)
        this.speed = options.speed || { x: range(-10, 10), y: range(-10, 10) }
        this.colors = options.colors || []
        this.opacity = options.opacity || range(50, 100)
        this.fadeOut = options.fadeOut
        this.fadeIn = options.fadeIn
        this.shapes = options.shapes || []
    }
}