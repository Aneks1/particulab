import range from "../utils/range";
import Particle from "./Particle";
export default class ParticleSystem {
    canvas;
    canvasSize;
    lastId = 0;
    particles = new Map();
    _ctx;
    animationFrameId;
    lastUpdate = performance.now();
    plugins = new Map();
    updateMethods = [];
    createMethods = [];
    pluginData = new Map();
    amount;
    life;
    size;
    speed;
    colors;
    opacity;
    shapes;
    static numberInRange(interval) {
        const min = Math.ceil(interval.min);
        const max = Math.floor(interval.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static elementFromArray(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    installPlugin(plugin) {
        plugin.setup(this);
        this.plugins.set(plugin.id, plugin);
        this.updateMethods.push(plugin.onParticleUpdate);
        this.createMethods.push(plugin.onParticleCreate);
    }
    createParticle() {
        const particle = new Particle(this.lastId.toString(), this, {
            position: {
                x: ParticleSystem.numberInRange({ min: 0, max: this.canvasSize.x }),
                y: ParticleSystem.numberInRange({ min: 0, max: this.canvasSize.y })
            },
            size: ParticleSystem.numberInRange(this.size),
            lifeSpan: ParticleSystem.numberInRange(this.life),
            speed: {
                x: ParticleSystem.numberInRange(this.speed.x),
                y: ParticleSystem.numberInRange(this.speed.y)
            },
            color: ParticleSystem.elementFromArray(this.colors),
            opacity: ParticleSystem.numberInRange(this.opacity),
            // fadeIn: this.fadeIn,
            // fadeOut: this.fadeOut, ---- Plugin
            shape: ParticleSystem.elementFromArray(this.shapes)
        });
        for (const meth of this.createMethods)
            meth(particle);
        for (const meth of this.updateMethods)
            particle.onParticleUpdate(meth);
        particle.init();
        this.particles.set(this.lastId.toString(), particle);
        this.lastId++;
    }
    init() {
        for (let i = 0; i < this.amount; i++)
            this.createParticle();
        this.update();
    }
    update() {
        const now = performance.now();
        const deltaTime = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;
        if (this.particles.size < this.amount)
            for (let i = this.particles.size; i < this.amount; i++)
                this.createParticle();
        this._ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const [i, p] of this.particles) {
            p.update(deltaTime);
            p.draw(this._ctx);
        }
        this.animationFrameId = requestAnimationFrame(this.update.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.animationFrameId);
    }
    clear() {
        this._ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = new Map();
    }
    onParticleCreate(callback) {
        this.createMethods.push(callback);
        return callback;
    }
    constructor(canvas, options) {
        this.canvas = canvas;
        this.canvasSize = options.canvasSize;
        canvas.width = options.canvasSize.x;
        canvas.height = options.canvasSize.y;
        this._ctx = canvas.getContext('2d');
        // Set the particle properties
        this.amount = options.amount || 0;
        this.life = options.lifeSpan || range(10, 15);
        this.size = options.size || range(1, 5);
        this.speed = options.speed || { x: range(-10, 10), y: range(-10, 10) };
        this.colors = options.colors || [];
        this.opacity = options.opacity || range(50, 100);
        this.shapes = options.shapes || [];
    }
}
