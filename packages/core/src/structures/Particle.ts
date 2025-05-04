import HEX from "./Colors/HEX"
import RGBA from "./Colors/RGBA"
import ParticleSystem from "./ParticleSystem"
import ParticleOptions from "./Options/ParticleOptions"
import ParticleImage from "./ParticleImage"
import ShapeManager from "./ShapeManager"
import { Vector, Shape, ParticleUpdateCallback } from ".."

export default class Particle {
    private readonly parent: ParticleSystem
    private readonly id: string
    private animationFramId!: number
    private shapeManager: ShapeManager = new ShapeManager()
    private _age: number
    private updateMethods: ParticleUpdateCallback[] = []
    public pluginData: Map<string, Record<string, any>> = new Map()

    public position: Vector
    public acceleration: Vector
    public size: number
    public readonly lifeSpan: number
    public velocity: Vector
    public color: RGBA | HEX
    public opacity: number
    public shape: Shape
    public get age() { return this._age }

    public update(deltaTime: number) {
        this.position.x += this.velocity.x * deltaTime
        this.position.y -= this.velocity.y * deltaTime
        this.velocity.x += this.acceleration.x * deltaTime
        this.velocity.y += this.acceleration.y * deltaTime

        for (const meth of this.updateMethods) meth(this, deltaTime)

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
                break
            case "rectangle":
                this.shapeManager.drawRectangle(ctx, { position: this.position, size: this.size })
                break
            case "triangle":
                this.shapeManager.drawTriangle(ctx, { position: this.position, size: this.size })
                break
            case "star":
                this.shapeManager.drawStar(ctx, { position: this.position, size: this.size })
                break
            default: 
                if(!(this.shape as ParticleImage).element) console.warn('Invalid shape ' + this.shape)
                else this.shapeManager.drawImage(this.shape as ParticleImage, ctx, { position: this.position, size: this.size })
        }
    }

    public onParticleUpdate(callback: ParticleUpdateCallback): ParticleUpdateCallback {
        this.updateMethods.push(callback)
        return callback
    }

    constructor(id: string, parent: ParticleSystem, options?: ParticleOptions) {
        this.parent = parent
        this.id = id
        this._age = 0

        // Set the particle properties
        this.acceleration = options?.acceleration || { x: 0, y: 0 }
        this.size = options?.size || 0
        this.position = options?.position || { x: 0, y: 0 }
        this.lifeSpan = options?.lifeSpan || 10
        this.velocity = options?.velocity || { x: 0, y: 0 }
        this.color = options?.color || new RGBA(255, 255, 255, 1)
        this.opacity = options?.opacity || 100
        this.shape = options?.shape || 'circle'
    }
}