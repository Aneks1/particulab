import HEX from "./Colors/HEX"
import RGBA from "./Colors/RGBA"
import ParticleSystem from "./ParticleSystem"
import FadeOptions from "./Options/FadeOptions"
import { FadeInHandler, FadeOutHandler } from "./FadeHandler"
import ParticleOptions from "./Options/ParticleOptions"
import ParticleImage from "./ParticleImage"
import ShapeManager from "./ShapeManager"
import { Vector, Shape } from ".."

export default class Particle {
    private parent: ParticleSystem
    private readonly id: string
    private animationFramId!: number
    private lastUpdate: number = performance.now()
    private shapeManager: ShapeManager = new ShapeManager()

    public position: Vector = { x: 0, y: 0 }
    public size = 0
    public life = 0
    public speed: Vector = { x: 0, y: 0 }
    public color: RGBA | HEX = new HEX("#ffffff") 
    public opacity = 100
    public shape: Shape = 'circle'

    // Fade Properties
    public fadeOut?: FadeOptions
    public fadeIn?: FadeOptions
    private fadeOutHandler?: FadeOutHandler
    private fadeInHandler?: FadeInHandler
     
    public init() {
        if(this.fadeOut && (this.fadeOut.opacity != undefined || this.fadeOut.scaleFactor != undefined)) this.fadeOutHandler = new FadeOutHandler(this, this.fadeOut)
        if(this.fadeIn && (this.fadeIn.opacity != undefined || this.fadeIn.scaleFactor != undefined)) this.fadeInHandler = new FadeInHandler(this, this.fadeIn)

        this.opacity = this.fadeIn?.opacity != undefined ? this.fadeIn?.opacity : Math.max(0, Math.min(100, this.opacity))
        this.size = this.fadeIn?.scaleFactor != undefined ? this.fadeIn?.scaleFactor : Math.max(0, this.size)
        this.life = Math.max(0, this.life)

        this.update()
    }

    private update() {
        const now = performance.now()
        const deltaTime = (now - this.lastUpdate) / 1000
        this.lastUpdate = now

        this.position.x += this.speed.x * deltaTime
        this.position.y -= this.speed.y * deltaTime

        if(this.fadeIn && this.fadeInHandler) {
            if(this.life >= this.fadeInHandler.initialLife - this.fadeIn.duration) {
                this.opacity += this.fadeInHandler?.deltaOpacity * deltaTime
                this.opacity = Math.max(0, Math.min(100, this.opacity))
                this.size += this.fadeInHandler.deltaSize * deltaTime
                this.size = Math.max(0, this.size)
            }
        }

        if(this.fadeOut && this.fadeOutHandler) {
            if(this.life <= this.fadeOut?.duration) {
                this.opacity += this.fadeOutHandler?.deltaOpacity * deltaTime
                this.opacity = Math.max(0, Math.min(100, this.opacity))
                this.size += this.fadeOutHandler.deltaSize * deltaTime
                this.size = Math.max(0, this.size)
            }
        }

        this.life -= 1/60
        if(this.life <= 0) this.delete()
        this.animationFramId = requestAnimationFrame(this.update.bind(this))
    }

    private delete() {
        cancelAnimationFrame(this.animationFramId)
        this.parent.particles.delete(this.id)
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color.toString()
        ctx.globalAlpha = this.opacity/100
        switch(this.shape) {
            case "circle":
                this.shapeManager.drawCircle(ctx, { position: this.position, size: this.size })
            case "rectangle":
                this.shapeManager.drawRectangle(ctx, { position: this.position, size: this.size })
            case "triangle":
                this.shapeManager.drawTriangle(ctx, { position: this.position, size: this.size })
            case "star":
                this.shapeManager.drawStar(ctx, { position: this.position, size: this.size })
            default: 
                if(!(this.shape as ParticleImage).element) console.warn('Invalid shape ' + this.shape)
                else this.shapeManager.drawImage(this.shape as ParticleImage, ctx, { position: this.position, size: this.size })
        }
    }

    constructor(id: string, parent: ParticleSystem, options?: ParticleOptions) {
        this.parent = parent
        this.id = id
    }
}