import RGBA from "./Colors/RGBA";
import ShapeManager from "./ShapeManager";
export default class Particle {
    parent;
    id;
    animationFramId;
    shapeManager = new ShapeManager();
    _age;
    updateMethods = [];
    pluginData = new Map();
    position;
    acceleration;
    size;
    lifeSpan;
    velocity;
    color;
    opacity;
    shape;
    get age() { return this._age; }
    update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y -= this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        for (const meth of this.updateMethods)
            meth(this, deltaTime);
        this._age += deltaTime;
        if (this._age >= this.lifeSpan)
            this.delete();
    }
    delete() {
        cancelAnimationFrame(this.animationFramId);
        this.parent.particles.delete(this.id);
    }
    draw(ctx) {
        ctx.fillStyle = this.color.toString();
        ctx.globalAlpha = this.opacity / 100;
        switch (this.shape) {
            case "circle":
                this.shapeManager.drawCircle(ctx, { position: this.position, size: this.size });
                break;
            case "rectangle":
                this.shapeManager.drawRectangle(ctx, { position: this.position, size: this.size });
                break;
            case "triangle":
                this.shapeManager.drawTriangle(ctx, { position: this.position, size: this.size });
                break;
            case "star":
                this.shapeManager.drawStar(ctx, { position: this.position, size: this.size });
                break;
            default:
                if (!this.shape.element)
                    console.warn('Invalid shape ' + this.shape);
                else
                    this.shapeManager.drawImage(this.shape, ctx, { position: this.position, size: this.size });
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
        this.acceleration = options?.acceleration || { x: 0, y: 0 };
        this.size = options?.size || 0;
        this.position = options?.position || { x: 0, y: 0 };
        this.lifeSpan = options?.lifeSpan || 10;
        this.velocity = options?.velocity || { x: 0, y: 0 };
        this.color = options?.color || new RGBA(255, 255, 255, 1);
        this.opacity = options?.opacity || 100;
        this.shape = options?.shape || 'circle';
    }
}
