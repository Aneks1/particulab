import range from "../utils/range"
import HEX from "./Colors/HEX"
import RGBA from "./Colors/RGBA"
import Particle from "./Particle"
import { OpacityFadeOptions, ScaleFadeOptions, OpacityScaleFadeOptions } from "./FadeOptions"

type interval = { min: number, max: number }
type vectorInterval = { x: interval, y: interval }
type vector = { x: number, y: number }
type fadeTypes = "opacity" | "scale" | "opacity-scale"

export default class ParticleSystem {
    private canvas: HTMLCanvasElement
    private size: vector
    private lastId = 0

    public deltaTime = 1000/60
    public ammount = 0
    public particles: Map<string, Particle> = new Map()
    public diameter: interval = range(1, 5)
    public life: interval = range(10, 15)
    public speed: vectorInterval = { x: range(-10, 10), y: range(-10, 10) }
    public colors: (RGBA | HEX)[] = []
    public opacity: interval = range(50, 100)

    private fadeOut: {
        type: fadeTypes | null,
        options: OpacityFadeOptions | ScaleFadeOptions | OpacityScaleFadeOptions | null
    } = {
        type: null,
        options: null
    }

    private fadeIn: {
        type: fadeTypes | null,
        options: OpacityFadeOptions | ScaleFadeOptions | OpacityScaleFadeOptions | null
    } = {
        type: null,
        options: null
    }

    public static getRandomNumberInInterval(invterval: interval) {
        const min = Math.ceil(invterval.min);
        const max = Math.floor(invterval.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static getRandomElementFromArray<T>(arr: T[]): T {
        const randomIndex = Math.floor(Math.random() * arr.length)
        return arr[randomIndex]
    }

    private createParticle() {
        const particle = new Particle(this.lastId.toString(), this)
        particle.position.x = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.x })
        particle.position.y = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.y })
        particle.diameter = ParticleSystem.getRandomNumberInInterval(this.diameter)
        particle.life = ParticleSystem.getRandomNumberInInterval(this.life)
        particle.speed.x = ParticleSystem.getRandomNumberInInterval(this.speed.x)
        particle.speed.y = ParticleSystem.getRandomNumberInInterval(this.speed.y)
        particle.color = ParticleSystem.getRandomElementFromArray(this.colors || new HEX('fff'))
        particle.opacity = ParticleSystem.getRandomNumberInInterval(this.opacity)
        particle.fadeOut = this.fadeOut
        particle.init()
        this.particles.set(this.lastId.toString(), particle)
        this.lastId++
    }

    /**
     * 
     * @param type The fade in type for the particle
     * @param options The options for the final state of the particle
     */

    public setFadeOutType<T extends fadeTypes>(type: T, options: T extends "opacity" ? OpacityFadeOptions : T extends "scale" ? ScaleFadeOptions : T extends "opacity-scale" ? OpacityScaleFadeOptions : never): void {
        if((type == "opacity" && 
        ((options as OpacityFadeOptions).opacity < 0) || (options as OpacityFadeOptions).opacity > 100)
        || type == "opacity-scale" && 
        ((options as OpacityScaleFadeOptions).opacity < 0) || (options as OpacityScaleFadeOptions).opacity > 100) {
            throw new Error("opacity must be between 0 and 100")
        }

        if((type == "scale" && 
        ((options as ScaleFadeOptions).scaleFactor < 0))
        || (type == "opacity-scale" && 
        ((options as OpacityScaleFadeOptions).scaleFactor < 0))) {
            throw new Error("scaleFactor must be greater than 0")
        }

        this.fadeOut = {
            type: type,
            options: options
        }
    }

    /**
     * 
     * @param type The fade in type for the particle
     * @param options The options for the initial state of the particle
     */

    public setFadeInType<T extends fadeTypes>(type: T, options: T extends "opacity" ? OpacityFadeOptions : T extends "scale" ? ScaleFadeOptions : T extends "opacity-scale" ? OpacityScaleFadeOptions : never): void {
        if((type == "opacity" && 
        ((options as OpacityFadeOptions).opacity < 0) || (options as OpacityFadeOptions).opacity > 100)
        || type == "opacity-scale" && 
        ((options as OpacityScaleFadeOptions).opacity < 0) || (options as OpacityScaleFadeOptions).opacity > 100) {
            throw new Error("opacity must be between 0 and 100")
        }

        if((type == "scale" && 
        ((options as ScaleFadeOptions).scaleFactor < 0))
        || (type == "opacity-scale" && 
        ((options as OpacityScaleFadeOptions).scaleFactor < 0))) {
            throw new Error("scaleFactor must be greater than 0")
        }

        this.fadeIn = {
            type: type,
            options: options
        }
    }

    public init() {
        const ctx = this.canvas.getContext('2d')

        for(let i = 0; i < this.ammount; i++) this.createParticle()

        setInterval(() => {
            if(this.particles.size < this.ammount)
                for(let i = this.particles.size; i < this.ammount; i++) this.createParticle()
            ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.particles.forEach((particle: Particle) => {
                ctx!.fillStyle = particle.color.toString()
                ctx!.globalAlpha = particle.opacity/100
                ctx?.beginPath();
                ctx?.arc(particle.position.x, particle.position.y, particle.diameter / 2, 0, 2 * Math.PI, false);
                ctx?.closePath()
                ctx?.fill();
            })
        }, this.deltaTime)
    }

    constructor(canvas: HTMLCanvasElement, size: vector) {
        this.canvas = canvas
        this.size = size
        canvas.width = size.x
        canvas.height = size.y
    }
}