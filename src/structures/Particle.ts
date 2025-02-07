import HEX from "./Colors/HEX"
import RGBA from "./Colors/RGBA"
import ParticleSystem from "./ParticleSystem"
import FadeOptions from "./FadeOptions"
import FadeHandler, { FadeInHandler, FadeOutHandler } from "./FadeHandler"

type vector = { x: number, y: number }

export default class Particle {
    private parent: ParticleSystem
    private readonly id: string
    public position: vector = { x: 0, y: 0 }
    public size = 0
    public life = 0
    public speed: vector = { x: 0, y: 0 }
    public color: RGBA | HEX = new HEX("#ffffff") 
    public opacity = 100

    // Fade Properties
    public fadeOut?: FadeOptions
    public fadeIn?: FadeOptions
    private fadeOutHandler?: FadeOutHandler
    private fadeInHandler?: FadeInHandler
     
    public init() {

        if(this.fadeOut && (this.fadeOut.opacity || this.fadeOut.scaleFactor)) this.fadeOutHandler = new FadeOutHandler(this, this.fadeOut)
        if(this.fadeIn && (this.fadeIn.opacity || this.fadeIn.scaleFactor)) this.fadeInHandler = new FadeInHandler(this, this.fadeIn)

        this.opacity = this.fadeIn?.opacity != undefined ? this.fadeIn?.opacity : Math.max(0, Math.min(100, this.opacity))
        this.size = this.fadeIn?.scaleFactor != undefined ? this.fadeIn?.scaleFactor : Math.max(0, this.size)
        this.life = Math.max(0, this.life)

        const interval = setInterval(() => {
            this.position.x += this.speed.x*60/1000
            this.position.y -= this.speed.y*60/1000

            if(this.fadeIn && this.fadeInHandler) {
                if(this.life >= this.fadeInHandler.initialLife - this.fadeIn.duration) {
                    this.opacity += this.fadeInHandler?.deltaOpacity * (1/60)
                    this.opacity = Math.max(0, Math.min(100, this.opacity))
                    this.size += this.fadeInHandler.deltaSize * (1/60)
                    this.size = Math.max(0, this.size)
                }
            }

            if(this.fadeOut && this.fadeOutHandler) {
                if(this.life <= this.fadeOut?.duration) {
                    this.opacity += this.fadeOutHandler?.deltaOpacity * (1/60)
                    this.opacity = Math.max(0, Math.min(100, this.opacity))
                    this.size += this.fadeOutHandler.deltaSize * (1/60)
                    this.size = Math.max(0, this.size)
                }
            }

            this.life -= 1/60

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