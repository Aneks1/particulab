import range from "../utils/range";
import RGBA from "./Colors/RGBA";
import Particle from "./Particle";
import Vector2 from "./Vector2";
import Emitter from "./Emitter";
export default class ParticleSystem {
    canvas;
    canvasSize;
    lastId = 0;
    particles = new Map();
    _ctx;
    plugins = new Map();
    updateMethods = [];
    createMethods = [];
    pluginData = new Map();
    // Loop Data
    running = false;
    animationFrameId;
    lastUpdate = 0;
    emitter;
    // Particle Data
    amount;
    life;
    size;
    mass;
    velocity;
    acceleration;
    colors;
    opacity;
    shapes;
    installPlugin(plugin) {
        plugin.setup(this);
        this.plugins.set(plugin.id, plugin);
        this.updateMethods.push(plugin.onParticleUpdate);
        this.createMethods.push(plugin.onParticleCreate);
    }
    createParticle() {
        const particle = new Particle(this.lastId.toString(), this, {
            position: ParticleSystem.randomVector({
                x: { min: 0, max: this.canvasSize.x },
                y: { min: 0, max: this.canvasSize.y }
            }),
            mass: ParticleSystem.randomFloat(this.mass),
            size: ParticleSystem.randomFloat(this.size),
            lifeSpan: ParticleSystem.randomFloat(this.life),
            velocity: ParticleSystem.randomVector(this.velocity),
            acceleration: ParticleSystem.randomVector(this.acceleration),
            color: ParticleSystem.elementFromArray(this.colors),
            opacity: ParticleSystem.randomFloat(this.opacity),
            shape: ParticleSystem.elementFromArray(this.shapes)
        });
        for (const m of this.createMethods)
            m(particle);
        for (const m of this.updateMethods)
            particle.onParticleUpdate(m);
        this.particles.set(this.lastId.toString(), particle);
        this.lastId++;
    }
    init() {
        if (this.running)
            return;
        while (this.particles.size < this.amount) {
            this.createParticle();
        }
        this.running = true;
        this.lastUpdate = performance.now();
        this.animationFrameId = requestAnimationFrame(this.update);
    }
    update = (now) => {
        if (!this.running)
            return;
        // When the user leaves the browser tab, delta time can get too big
        const deltaTime = Math.min(Math.max((now - this.lastUpdate) / 1000, 0), 0.05);
        this.lastUpdate = now;
        while (this.particles.size < this.amount) {
            this.createParticle();
        }
        this._ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const [i, p] of this.particles) {
            p.update(deltaTime);
            if (!this.particles.has(i))
                continue;
            p.draw(this._ctx);
        }
        this.emitter.drawDebug(this._ctx);
        this.animationFrameId = requestAnimationFrame(this.update.bind(this));
    };
    stop() {
        if (!this.running)
            return;
        this.running = false;
        if (this.animationFrameId !== undefined) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = undefined;
        }
    }
    clear() {
        this._ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.clear();
    }
    onParticleCreate(callback) {
        this.createMethods.push(callback);
        return callback;
    }
    static randomFloat(interval) {
        return interval.min +
            Math.random() * (interval.max - interval.min);
    }
    static randomVector(interval) {
        return new Vector2(ParticleSystem.randomFloat(interval.x), ParticleSystem.randomFloat(interval.y));
    }
    static elementFromArray(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    constructor(canvas, options) {
        this.canvas = canvas;
        this.canvasSize = options.canvasSize;
        canvas.width = options.canvasSize.x;
        canvas.height = options.canvasSize.y;
        this._ctx = canvas.getContext('2d');
        // Set the particle properties
        this.amount = options.amount ?? 100;
        this.life = options.lifeSpan ?? range(10, 15);
        this.size = options.size ?? range(1, 5);
        this.mass = options.mass ?? range(1, 5);
        this.velocity = options.velocity ?? { x: range(-10, 10), y: range(-10, 10) };
        this.acceleration = options.acceleration ?? { x: range(0, 0), y: range(0, 0) };
        if (options.colors && options.colors.length === 0)
            throw RangeError("Colors array cannot be empty");
        else
            this.colors = options.colors ?? [new RGBA(255, 255, 255, 1)];
        if (options.shapes && options.shapes.length === 0)
            throw RangeError("Shapes array cannot be empty");
        else
            this.shapes = options.shapes ?? ["circle"];
        this.opacity = options.opacity ?? range(50, 100);
        this.emitter = options.emitter ?? new Emitter({
            coordinates: "cartesian",
            fn: (x) => 0,
            domain: [0, this.canvas.width],
            range: [0, this.canvas.height],
            position: { x: 0, y: this.canvas.height / 2 }
        });
    }
}
