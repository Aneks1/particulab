import HEX from "./Colors/HEX"
import RGBA from "./Colors/RGBA"
import ParticleSystem from "./ParticleSystem"
import ParticleOptions from "./Options/ParticleOptions"
import ParticleImage from "./ParticleImage"
import ShapeManager from "./ShapeManager"
import { Shape, ParticleUpdateCallback, Vector } from ".."
import Vector2 from "./Vector2"

export default class Particle {
    private readonly parent: ParticleSystem
    private readonly id: string
    private shapeManager: ShapeManager = new ShapeManager()
    private _age: number
    private updateMethods: ParticleUpdateCallback[] = []
    public pluginData: Map<string, Record<string, any>> = new Map()

    public position: Vector2
    public velocity: Vector2
    public acceleration: Vector2
    private _mass: number = 1
    private netForce: Vector2 = Vector2.zero()

    public get mass(): number { return this._mass }
    public set mass(value: number) {
    if (!Number.isFinite(value) || value <= 0) {
        throw new RangeError(
            "Particle mass must be a finite positive number"
        )
    }

    this._mass = value
}

    public size: number
    public readonly lifeSpan: number
    public color: RGBA | HEX
    public opacity: number
    public shape: Shape
    public get age() { return this._age }

    public update(deltaTime: number) {
        for (const m of this.updateMethods) m(this, deltaTime)

        const totalAcceleration = Vector2.add(this.acceleration, Vector2.divide(this.netForce, this.mass))
        this.velocity.add(Vector2.multiply(totalAcceleration, deltaTime))
        this.position.add(Vector2.multiply(this.velocity, deltaTime))

        this.netForce.set(0, 0)

        this._age += deltaTime
        if(this._age >= this.lifeSpan) this.delete()
    }

    public applyForce(force: Vector): void {
        this.netForce.add(force)
    }

    private toCanvas(canvasHeight: number): Vector {
        return { x: this.position.x, y: canvasHeight - this.position.y }
    }

    private delete() {
        this.parent.particles.delete(this.id)
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color.toString()
        ctx.globalAlpha = this.opacity/100

        const canvasPosition = this.toCanvas(ctx.canvas.height)

        switch(this.shape) {
            case "circle":
                this.shapeManager.drawCircle(ctx, { position: canvasPosition, size: this.size })
                break
            case "rectangle":
                this.shapeManager.drawRectangle(ctx, { position: canvasPosition, size: this.size })
                break
            case "triangle":
                this.shapeManager.drawTriangle(ctx, { position: canvasPosition, size: this.size })
                break
            case "star":
                this.shapeManager.drawStar(ctx, { position: canvasPosition, size: this.size })
                break
            default: 
                if(!(this.shape as ParticleImage).element) console.warn('Invalid shape ' + this.shape)
                else this.shapeManager.drawImage(this.shape as ParticleImage, ctx, { position: canvasPosition, size: this.size })
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
        this.position = Vector2.from(options?.position ?? Vector2.zero())
        this.velocity = Vector2.from(options?.velocity ?? Vector2.zero())
        this.acceleration = Vector2.from(options?.acceleration ?? Vector2.zero())

        this.mass = options?.mass ?? 1
        this.size = options?.size ?? 0

        this.lifeSpan = options?.lifeSpan ?? 10
        this.color = options?.color ?? new RGBA(255, 255, 255, 1)
        this.opacity = options?.opacity ?? 100
        this.shape = options?.shape ?? 'circle'
    }
}