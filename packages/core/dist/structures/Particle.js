import RGBA from "./Colors/RGBA";
import ShapeManager from "./ShapeManager";
import Vector2 from "./Vector2";
export default class Particle {
    parent;
    id;
    shapeManager = new ShapeManager();
    _age;
    updateMethods = [];
    pluginData = new Map();
    position;
    velocity;
    acceleration;
    _mass = 1;
    netForce = Vector2.zero();
    get mass() { return this._mass; }
    set mass(value) {
        if (!Number.isFinite(value) || value <= 0) {
            throw new RangeError("Particle mass must be a finite positive number");
        }
        this._mass = value;
    }
    size;
    lifeSpan;
    color;
    opacity;
    shape;
    get age() { return this._age; }
    update(deltaTime) {
        for (const m of this.updateMethods)
            m(this, deltaTime);
        const totalAcceleration = Vector2.add(this.acceleration, Vector2.divide(this.netForce, this.mass));
        this.velocity.add(Vector2.multiply(totalAcceleration, deltaTime));
        this.position.add(Vector2.multiply(this.velocity, deltaTime));
        this.netForce.set(0, 0);
        this._age += deltaTime;
        if (this._age >= this.lifeSpan)
            this.delete();
    }
    applyForce(force) {
        this.netForce.add(force);
    }
    toCanvas(canvasHeight) {
        return { x: this.position.x, y: canvasHeight - this.position.y };
    }
    delete() {
        this.parent.particles.delete(this.id);
    }
    draw(ctx) {
        ctx.fillStyle = this.color.toString();
        ctx.globalAlpha = this.opacity / 100;
        const canvasPosition = this.toCanvas(ctx.canvas.height);
        switch (this.shape) {
            case "circle":
                this.shapeManager.drawCircle(ctx, { position: canvasPosition, size: this.size });
                break;
            case "rectangle":
                this.shapeManager.drawRectangle(ctx, { position: canvasPosition, size: this.size });
                break;
            case "triangle":
                this.shapeManager.drawTriangle(ctx, { position: canvasPosition, size: this.size });
                break;
            case "star":
                this.shapeManager.drawStar(ctx, { position: canvasPosition, size: this.size });
                break;
            default:
                if (!this.shape.element)
                    console.warn('Invalid shape ' + this.shape);
                else
                    this.shapeManager.drawImage(this.shape, ctx, { position: canvasPosition, size: this.size });
        }
    }
    onParticleUpdate(callback) {
        this.updateMethods.push(callback);
        return callback;
    }
    constructor(id, parent, options) {
        this.parent = parent;
        this.id = id;
        this._age = 0;
        // Set the particle properties
        this.position = Vector2.from(options?.position ?? Vector2.zero());
        this.velocity = Vector2.from(options?.velocity ?? Vector2.zero());
        this.acceleration = Vector2.from(options?.acceleration ?? Vector2.zero());
        this.mass = options?.mass ?? 1;
        this.size = options?.size ?? 0;
        this.lifeSpan = options?.lifeSpan ?? 10;
        this.color = options?.color ?? new RGBA(255, 255, 255, 1);
        this.opacity = options?.opacity ?? 100;
        this.shape = options?.shape ?? 'circle';
    }
}
