var g = Object.defineProperty;
var I = (n, t, i) => t in n ? g(n, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : n[t] = i;
var e = (n, t, i) => I(n, typeof t != "symbol" ? t + "" : t, i);
class z {
  constructor(t, i, a, s) {
    e(this, "red");
    e(this, "green");
    e(this, "blue");
    e(this, "alpha");
    if (this.red = t, this.green = i, this.blue = a, this.alpha = s, t > 255 || t < 0 || i > 255 || i < 0 || a > 255 || a < 0 || s > 1 || s < 0) throw new TypeError("Invalid rgba color.");
  }
  toHex() {
    const t = this._componentToHex(this.red), i = this._componentToHex(this.green), a = this._componentToHex(this.blue);
    return new l(`#${t}${i}${a}`);
  }
  _componentToHex(t) {
    const i = t.toString(16);
    return i.length === 1 ? "0" + i : i;
  }
  toString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}
class l {
  constructor(t) {
    e(this, "hex");
    t[0] === "#" && (t = t.slice(1)), t.length === 3 && (t = t.split("").map((i) => i + i).join("")), this.hex = t;
  }
  toRGB() {
    const t = parseInt(this.hex.slice(0, 2), 16), i = parseInt(this.hex.slice(2, 4), 16), a = parseInt(this.hex.slice(4, 6), 16);
    return new z(t, i, a, 1);
  }
  toString() {
    return `#${this.hex}`;
  }
}
class f {
  constructor(t, i) {
    e(this, "parent");
    e(this, "options");
    e(this, "deltaSize", 0);
    e(this, "deltaOpacity", 0);
    if (i.opacity == null && i.scaleFactor == null) throw new TypeError("Can not create a FadeHandler with opacity and scaleFactor both undefined .");
    this.parent = t, this.options = i;
  }
}
class y extends f {
  constructor(t, i) {
    super(t, i), this.calculateDeltas();
  }
  calculateDeltas() {
    this.options.opacity != null && (this.deltaOpacity = (this.options.opacity - this.parent.opacity) / this.options.duration), this.options.scaleFactor != null && (this.deltaSize = (this.options.scaleFactor * this.parent.size - this.parent.size) / this.options.duration);
  }
}
class w extends f {
  constructor(i, a) {
    super(i, a);
    e(this, "initialLife");
    this.calculateDeltas(), this.initialLife = this.parent.life;
  }
  calculateDeltas() {
    this.options.opacity != null && (this.deltaOpacity = (this.parent.opacity - this.options.opacity) / this.options.duration), this.options.scaleFactor != null && (this.deltaSize = (this.parent.size - this.options.scaleFactor * this.parent.size) / this.options.duration);
  }
}
class x {
  drawCircle(t, i) {
    t.beginPath(), t.arc(i.position.x, i.position.y, i.size / 2, 0, 2 * Math.PI, !1), t.closePath(), t.fill();
  }
  drawRectangle(t, i) {
    t.fillRect(i.position.x - i.size / 2, i.position.y - i.size / 2, i.size, i.size);
  }
  drawTriangle(t, i) {
    const a = i.size * Math.sqrt(3) / 2;
    t.beginPath(), t.moveTo(i.position.x, i.position.y - a / 2), t.lineTo(i.position.x - i.size / 2, i.position.y + a / 2), t.lineTo(i.position.x + i.size / 2, i.position.y + a / 2), t.closePath(), t.fill();
  }
  drawStar(t, i) {
    const s = i.size / 2, d = s / 2.5;
    let c = Math.PI / 5;
    t.beginPath();
    for (let r = 0; r < 5 * 2; r++) {
      let p = r % 2 === 0 ? s : d, u = i.position.x + Math.cos(c * r) * p, m = i.position.y + Math.sin(c * r) * p;
      t.lineTo(u, m);
    }
    t.closePath(), t.fill();
  }
  drawImage(t, i, a) {
    i.drawImage(t.element, a.position.x - a.size / 2, a.position.y - a.size / 2, a.size, a.size);
  }
}
class M {
  constructor(t, i, a) {
    e(this, "parent");
    e(this, "id");
    e(this, "animationFramId");
    e(this, "lastUpdate", performance.now());
    e(this, "shapeManager", new x());
    e(this, "position", { x: 0, y: 0 });
    e(this, "size", 0);
    e(this, "life", 0);
    e(this, "speed", { x: 0, y: 0 });
    e(this, "color", new l("#ffffff"));
    e(this, "opacity", 100);
    e(this, "shape", "circle");
    // Fade Properties
    e(this, "fadeOut");
    e(this, "fadeIn");
    e(this, "fadeOutHandler");
    e(this, "fadeInHandler");
    this.parent = i, this.id = t;
  }
  init() {
    var t, i, a, s;
    this.fadeOut && (this.fadeOut.opacity != null || this.fadeOut.scaleFactor != null) && (this.fadeOutHandler = new y(this, this.fadeOut)), this.fadeIn && (this.fadeIn.opacity != null || this.fadeIn.scaleFactor != null) && (this.fadeInHandler = new w(this, this.fadeIn)), this.opacity = ((t = this.fadeIn) == null ? void 0 : t.opacity) != null ? (i = this.fadeIn) == null ? void 0 : i.opacity : Math.max(0, Math.min(100, this.opacity)), this.size = ((a = this.fadeIn) == null ? void 0 : a.scaleFactor) != null ? (s = this.fadeIn) == null ? void 0 : s.scaleFactor : Math.max(0, this.size), this.life = Math.max(0, this.life), this.update();
  }
  update() {
    var a, s, d;
    const t = performance.now(), i = (t - this.lastUpdate) / 1e3;
    this.lastUpdate = t, this.position.x += this.speed.x * i, this.position.y -= this.speed.y * i, this.fadeIn && this.fadeInHandler && this.life >= this.fadeInHandler.initialLife - this.fadeIn.duration && (this.opacity += ((a = this.fadeInHandler) == null ? void 0 : a.deltaOpacity) * i, this.opacity = Math.max(0, Math.min(100, this.opacity)), this.size += this.fadeInHandler.deltaSize * i, this.size = Math.max(0, this.size)), this.fadeOut && this.fadeOutHandler && this.life <= ((s = this.fadeOut) == null ? void 0 : s.duration) && (this.opacity += ((d = this.fadeOutHandler) == null ? void 0 : d.deltaOpacity) * i, this.opacity = Math.max(0, Math.min(100, this.opacity)), this.size += this.fadeOutHandler.deltaSize * i, this.size = Math.max(0, this.size)), this.life -= 1 / 60, this.life <= 0 && this.delete(), this.animationFramId = requestAnimationFrame(this.update.bind(this));
  }
  delete() {
    cancelAnimationFrame(this.animationFramId), this.parent.particles.delete(this.id);
  }
  draw(t) {
    switch (t.fillStyle = this.color.toString(), t.globalAlpha = this.opacity / 100, this.shape) {
      case "circle":
        this.shapeManager.drawCircle(t, { position: this.position, size: this.size });
      case "rectangle":
        this.shapeManager.drawRectangle(t, { position: this.position, size: this.size });
      case "triangle":
        this.shapeManager.drawTriangle(t, { position: this.position, size: this.size });
      case "star":
        this.shapeManager.drawStar(t, { position: this.position, size: this.size });
      default:
        this.shape.element ? this.shapeManager.drawImage(this.shape, t, { position: this.position, size: this.size }) : console.warn("Invalid shape " + this.shape);
    }
  }
}
function o(n, t) {
  return { min: n, max: t };
}
class h {
  constructor(t, i) {
    e(this, "canvas");
    e(this, "canvasSize");
    e(this, "lastId", 0);
    e(this, "particles", /* @__PURE__ */ new Map());
    e(this, "_ctx");
    e(this, "animationFramId");
    e(this, "amount");
    e(this, "life");
    e(this, "size");
    e(this, "speed");
    e(this, "colors");
    e(this, "opacity");
    e(this, "fadeOut");
    e(this, "fadeIn");
    e(this, "shapes");
    this.canvas = t, this.canvasSize = i.canvasSize, t.width = i.canvasSize.x, t.height = i.canvasSize.y, this._ctx = t.getContext("2d"), this.amount = i.amount || 0, this.life = i.life || o(10, 15), this.size = i.size || o(1, 5), this.speed = i.speed || { x: o(-10, 10), y: o(-10, 10) }, this.colors = i.colors || [], this.opacity = i.opacity || o(50, 100), this.fadeOut = i.fadeOut, this.fadeIn = i.fadeIn, this.shapes = i.shapes || [];
  }
  static numberInRange(t) {
    const i = Math.ceil(t.min), a = Math.floor(t.max);
    return Math.floor(Math.random() * (a - i + 1)) + i;
  }
  static elementFromArray(t) {
    const i = Math.floor(Math.random() * t.length);
    return t[i];
  }
  createParticle() {
    const t = new M(this.lastId.toString(), this);
    t.position.x = h.numberInRange({ min: 0, max: this.canvasSize.x }), t.position.y = h.numberInRange({ min: 0, max: this.canvasSize.y }), t.size = h.numberInRange(this.size), t.life = h.numberInRange(this.life), t.speed.x = h.numberInRange(this.speed.x), t.speed.y = h.numberInRange(this.speed.y), t.color = h.elementFromArray(this.colors) || new l("fff"), t.opacity = h.numberInRange(this.opacity), t.fadeOut = this.fadeOut, t.fadeIn = this.fadeIn, t.shape = h.elementFromArray(this.shapes) || "circle", t.init(), this.particles.set(this.lastId.toString(), t), this.lastId++;
  }
  init() {
    for (let t = 0; t < this.amount; t++) this.createParticle();
    this.update();
  }
  update() {
    var t;
    if (this.particles.size < this.amount) for (let i = this.particles.size; i < this.amount; i++) this.createParticle();
    (t = this._ctx) == null || t.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const [i, a] of this.particles) a.draw(this._ctx);
    this.animationFramId = requestAnimationFrame(this.update.bind(this));
  }
  stop() {
    cancelAnimationFrame(this.animationFramId);
  }
  clear() {
    var t;
    (t = this._ctx) == null || t.clearRect(0, 0, this.canvas.width, this.canvas.height), this.particles = /* @__PURE__ */ new Map();
  }
}
class H {
  constructor(t) {
    e(this, "src");
    e(this, "element");
    this.src = t, this.loadImage();
  }
  async loadImage() {
    try {
      this.element = await this.createImage(this.src);
    } catch (t) {
      console.error(`Failed to load image: ${this.src}`, t);
    }
  }
  createImage(t) {
    return new Promise((i, a) => {
      const s = new Image();
      s.src = t, s.onload = () => i(s), s.onerror = () => a(new Error(`Image failed to load: ${t}`));
    });
  }
}
export {
  f as FadeHandler,
  w as FadeInHandler,
  y as FadeOutHandler,
  l as HEX,
  M as Particle,
  H as ParticleImage,
  h as ParticleSystem,
  z as RGBA,
  x as ShapeManager,
  o as range
};
