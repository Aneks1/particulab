import HEX from "./Colors/HEX"
import RGBA from "./Colors/RGBA"
import ParticleSystem from "./ParticleSystem"
// import FadeOptions from "./Options/FadeOptions"
// import { FadeInHandler, FadeOutHandler } from "./FadeHandler"
import ParticleOptions from "./Options/ParticleOptions"
import ParticleImage from "./ParticleImage"
import ShapeManager from "./ShapeManager"
import { Vector, Shape } from ".."

export default class Particle {
    private readonly parent: ParticleSystem
    private readonly id: string
    private animationFramId!: number
    private shapeManager: ShapeManager = new ShapeManager()
    private _age: number

    public position: Vector
    public size: number
    public readonly lifeSpan: number
    public speed: Vector
    public color: RGBA | HEX
    public opacity: number
    public shape: Shape
    public get age() { return this._age }

    // Fade Properties
    // public fadeOut?: FadeOptions --------- Plugin Manager
    // public fadeIn?: FadeOptions
    // private fadeOutHandler?: FadeOutHandler
    // private fadeInHandler?: FadeInHandler
     
    public init() {
        // if(this.fadeOut && (this.fadeOut.opacity != undefined || this.fadeOut.scaleFactor != undefined)) this.fadeOutHandler = new FadeOutHandler(this, this.fadeOut)
        // if(this.fadeIn && (this.fadeIn.opacity != undefined || this.fadeIn.scaleFactor != undefined)) this.fadeInHandler = new FadeInHandler(this, this.fadeIn)

        // this.opacity = this.fadeIn?.opacity != undefined ? this.fadeIn?.opacity : Math.max(0, Math.min(100, this.opacity))
        // this.size = this.fadeIn?.scaleFactor != undefined ? this.fadeIn?.scaleFactor : Math.max(0, this.size)
    }

    public update(deltaTime: number) {
        this.position.x += this.speed.x * deltaTime
        this.position.y -= this.speed.y * deltaTime

        // if(this.fadeIn && this.fadeInHandler) {
        //     if(this.life >= this.fadeInHandler.initialLife - this.fadeIn.duration) {
        //         this.opacity += this.fadeInHandler?.deltaOpacity * deltaTime
        //         this.opacity = Math.max(0, Math.min(100, this.opacity))
        //         this.size += this.fadeInHandler.deltaSize * deltaTime
        //         this.size = Math.max(0, this.size)
        //     }
        // }

        // if(this.fadeOut && this.fadeOutHandler) {
        //     if(this.life <= this.fadeOut?.duration) {
        //         this.opacity += this.fadeOutHandler?.deltaOpacity * deltaTime
        //         this.opacity = Math.max(0, Math.min(100, this.opacity))
        //         this.size += this.fadeOutHandler.deltaSize * deltaTime
        //         this.size = Math.max(0, this.size)
        //     }
        // }

        this._age += deltaTime
        if(this._age >= this.lifeSpan) this.delete()
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
        this._age = 0

        // Set the particle properties
        this.size = options?.size || 0
        this.position = options?.position || { x: 0, y: 0 }
        this.lifeSpan = options?.lifeSpan || 10
        this.speed = options?.speed || { x: 0, y: 0 }
        this.color = options?.color || new RGBA(255, 255, 255, 1)
        this.opacity = options?.opacity || 100
        this.shape = options?.shape || 'circle'
    }
}