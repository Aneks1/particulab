import range from "../utils/range"
import HEX from "./Colors/HEX"
import RGBA from "./Colors/RGBA"
import Particle from "./Particle"
// import FadeOptions from "./Options/FadeOptions"
import ParticleSystemOptions from "./Options/ParticleSystemOptions"
import { VectorInterval, Vector, Shape, Interval } from ".."
import Plugin from "./Plugin"

export default class ParticleSystem {
    private readonly canvas: HTMLCanvasElement
    private canvasSize: Vector
    private lastId = 0
    public particles: Map<string, Particle> = new Map()
    private _ctx: CanvasRenderingContext2D
    private animationFrameId!: number
    private lastUpdate: number = performance.now()
    private _plugins: Map<string, Plugin> = new Map()

    public amount: number
    public life: Interval
    public size: Interval
    public speed: VectorInterval
    public colors: (RGBA | HEX)[]
    public opacity: Interval
    // public fadeOut?: FadeOptions
    // public fadeIn?: FadeOptions -------- Plugin
    public shapes: Shape[]

    private static numberInRange(interval: Interval) {
        const min = Math.ceil(interval.min);
        const max = Math.floor(interval.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private static elementFromArray<T>(arr: T[]): T {
        const randomIndex = Math.floor(Math.random() * arr.length)
        return arr[randomIndex]
    }

    public installPlugin(plugin: Plugin) {
        plugin.setup(this)
        this._plugins.set(plugin.id, plugin)
    }

    private createParticle() {
        const particle = new Particle(this.lastId.toString(), this, {
            position: { 
                x: ParticleSystem.numberInRange({ min: 0, max: this.canvasSize.x }),
                y: ParticleSystem.numberInRange({ min: 0, max: this.canvasSize.y })
            },
            size: ParticleSystem.numberInRange(this.size),
            lifeSpan: ParticleSystem.numberInRange(this.life),
            speed: {
                x: ParticleSystem.numberInRange(this.speed.x),
                y: ParticleSystem.numberInRange(this.speed.y)
            },
            color: ParticleSystem.elementFromArray(this.colors),
            opacity: ParticleSystem.numberInRange(this.opacity),
            // fadeIn: this.fadeIn,
            // fadeOut: this.fadeOut, ---- Plugin
            shape: ParticleSystem.elementFromArray(this.shapes)
        })

        particle.init()
        this.particles.set(this.lastId.toString(), particle)
        this.lastId++
    }

    public init() {
        for(let i = 0; i < this.amount; i++) this.createParticle()
        this.update()
    }

    private update() {
        const now = performance.now()
        const deltaTime = (now - this.lastUpdate) / 1000
        this.lastUpdate = now

        if(this.particles.size < this.amount) for(let i = this.particles.size; i < this.amount; i++) this.createParticle()
        this._ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (const [i, p] of this.particles) {
            for(const [x, y] of this._plugins) y.applyParticleEffect(p, deltaTime)
            p.update(deltaTime)
            p.draw(this._ctx)
        }
        this.animationFrameId = requestAnimationFrame(this.update.bind(this))
    }

    public stop() {
        cancelAnimationFrame(this.animationFrameId)
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
        this.life = options.lifeSpan || range(10, 15)
        this.size = options.size || range(1, 5)
        this.speed = options.speed || { x: range(-10, 10), y: range(-10, 10) }
        this.colors = options.colors || []
        this.opacity = options.opacity || range(50, 100)
        // this.fadeOut = options.fadeOut
        // this.fadeIn = options.fadeIn  --- Plugin
        this.shapes = options.shapes || []
    }
}