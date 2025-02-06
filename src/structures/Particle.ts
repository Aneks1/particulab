import HEX from "./Colors/HEX"
import RGBA from "./Colors/RGBA"
import ParticleSystem from "./ParticleSystem"
import { OpacityFadeOptions, ScaleFadeOptions, OpacityScaleFadeOptions } from "./FadeOptions"

type vector = { x: number, y: number }
type fadeTypes = "opacity" | "scale" | "opacity-scale"

export default class Particle {
    private parent: ParticleSystem
    private readonly id: string
    public position: vector = { x: 0, y: 0 }
    public diameter = 0
    public life = 0
    public speed: vector = { x: 0, y: 0 }
    public color: RGBA | HEX = new HEX("#ffffff") 
    public opacity = 100

    private deltaDiameter = 0
    private deltaOpacity = 0

    public fadeOut: {
        type: fadeTypes | null,
        options: OpacityFadeOptions | ScaleFadeOptions | OpacityScaleFadeOptions | null
    } = { 
        type: null, 
        options: null 
    }

    public fadeIn: {
        type: fadeTypes | null,
        options: OpacityFadeOptions | ScaleFadeOptions | OpacityScaleFadeOptions | null
    } = { 
        type: null, 
        options: null 
    }

    public init() {
        if(this.fadeOut.type && this.fadeOut.options) {
            if(this.fadeOut.type == 'opacity' || this.fadeOut.type == 'opacity-scale') {
                const opt = this.fadeOut.options as OpacityFadeOptions
                this.deltaOpacity = (opt.opacity - this.opacity) / opt.duration;
            }

            if(this.fadeOut.type == 'scale' || this.fadeOut.type == 'opacity-scale') {
                const opt = this.fadeOut.options as ScaleFadeOptions
                this.deltaDiameter = (opt.scaleFactor * this.diameter - this.diameter) / opt.duration;
            }
        }

        const interval = setInterval(() => {
            this.position.x += this.speed.x*60/1000
            this.position.y -= this.speed.y*60/1000
            this.life -= 1/60

            if(this.fadeOut.type && this.fadeOut.options) {
                if(this.life <= this.fadeOut.options.duration) {
                    this.opacity += this.deltaOpacity * (1/60)
                    this.opacity = Math.max(0, Math.min(100, this.opacity))
                    this.diameter += this.deltaDiameter * (1/60)
                    this.diameter = Math.max(0, this.diameter)
                }
            }

            if(this.life <= 0) {
                clearInterval(interval)
                this.parent.particles.delete(this.id)
            }
        }, this.parent.deltaTime)
    }
    constructor(id: string, parent: ParticleSystem) {
        this.parent = parent
        this.id = id
    }
}