var I = Object.defineProperty;
var y = (s, t, i) => t in s ? I(s, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[t] = i;
var e = (s, t, i) => y(s, typeof t != "symbol" ? t + "" : t, i);
class p {
  constructor(t, i, a, o) {
    e(this, "red");
    e(this, "green");
    e(this, "blue");
    e(this, "alpha");
    if (this.red = t, this.green = i, this.blue = a, this.alpha = o, t > 255 || t < 0 || i > 255 || i < 0 || a > 255 || a < 0 || o > 1 || o < 0) throw new TypeError("Invalid rgba color.");
  }
  toHex() {
    const t = this._componentToHex(this.red), i = this._componentToHex(this.green), a = this._componentToHex(this.blue);
    return new r(`#${t}${i}${a}`);
  }
  _componentToHex(t) {
    const i = t.toString(16);
    return i.length === 1 ? "0" + i : i;
  }
  toString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}
class r {
  constructor(t) {
    e(this, "hex");
    t[0] === "#" && (t = t.slice(1)), t.length === 3 && (t = t.split("").map((i) => i + i).join("")), this.hex = t;
  }
  toRGB() {
    const t = parseInt(this.hex.slice(0, 2), 16), i = parseInt(this.hex.slice(2, 4), 16), a = parseInt(this.hex.slice(4, 6), 16);
    return new p(t, i, a, 1);
  }
  toString() {
    return `#${this.hex}`;
  }
}
class u {
  constructor(t, i) {
    e(this, "parent");
    e(this, "options");
    e(this, "deltaSize", 0);
    e(this, "deltaOpacity", 0);
    if (!i.opacity && !i.scaleFactor) throw new TypeError("Can not create a FadeHandler with opacity and scaleFactor both undefined .");
    this.parent = t, this.options = i;
  }
}
class g extends u {
  constructor(t, i) {
    super(t, i), this.calculateDeltas();
  }
  calculateDeltas() {
    this.options.opacity != null && (this.deltaOpacity = (this.options.opacity - this.parent.opacity) / this.options.duration), this.options.scaleFactor != null && (this.deltaSize = (this.options.scaleFactor * this.parent.size - this.parent.size) / this.options.duration);
  }
}
class x extends u {
  constructor(i, a) {
    super(i, a);
    e(this, "initialLife");
    this.calculateDeltas(), this.initialLife = this.parent.life;
  }
  calculateDeltas() {
    this.options.opacity != null && (this.deltaOpacity = (this.parent.opacity - this.options.opacity) / this.options.duration), this.options.scaleFactor != null && (this.deltaSize = (this.parent.size - this.options.scaleFactor * this.parent.size) / this.options.duration);
  }
}
class m {
  constructor(t, i) {
    e(this, "parent");
    e(this, "id");
    e(this, "position", { x: 0, y: 0 });
    e(this, "size", 0);
    e(this, "life", 0);
    e(this, "speed", { x: 0, y: 0 });
    e(this, "color", new r("#ffffff"));
    e(this, "opacity", 100);
    // Fade Properties
    e(this, "fadeOut");
    e(this, "fadeIn");
    e(this, "fadeOutHandler");
    e(this, "fadeInHandler");
    this.parent = i, this.id = t;
  }
  init() {
    var i, a, o, d;
    this.fadeOut && (this.fadeOut.opacity || this.fadeOut.scaleFactor) && (this.fadeOutHandler = new g(this, this.fadeOut)), this.fadeIn && (this.fadeIn.opacity || this.fadeIn.scaleFactor) && (this.fadeInHandler = new x(this, this.fadeIn)), this.opacity = ((i = this.fadeIn) == null ? void 0 : i.opacity) != null ? (a = this.fadeIn) == null ? void 0 : a.opacity : Math.max(0, Math.min(100, this.opacity)), this.size = ((o = this.fadeIn) == null ? void 0 : o.scaleFactor) != null ? (d = this.fadeIn) == null ? void 0 : d.scaleFactor : Math.max(0, this.size), this.life = Math.max(0, this.life);
    const t = setInterval(() => {
      var l, c, f;
      this.position.x += this.speed.x * 60 / 1e3, this.position.y -= this.speed.y * 60 / 1e3, this.fadeIn && this.fadeInHandler && this.life >= this.fadeInHandler.initialLife - this.fadeIn.duration && (this.opacity += ((l = this.fadeInHandler) == null ? void 0 : l.deltaOpacity) * (1 / 60), this.opacity = Math.max(0, Math.min(100, this.opacity)), this.size += this.fadeInHandler.deltaSize * (1 / 60), this.size = Math.max(0, this.size)), this.fadeOut && this.fadeOutHandler && this.life <= ((c = this.fadeOut) == null ? void 0 : c.duration) && (this.opacity += ((f = this.fadeOutHandler) == null ? void 0 : f.deltaOpacity) * (1 / 60), this.opacity = Math.max(0, Math.min(100, this.opacity)), this.size += this.fadeOutHandler.deltaSize * (1 / 60), this.size = Math.max(0, this.size)), this.life -= 1 / 60, this.life <= 0 && (clearInterval(t), this.parent.particles.delete(this.id));
    }, this.parent.deltaTime);
  }
}
function h(s, t) {
  return { min: s, max: t };
}
class n {
  constructor(t, i) {
    e(this, "canvas");
    e(this, "canvasSize");
    e(this, "lastId", 0);
    e(this, "deltaTime", 1e3 / 60);
    e(this, "ammount", 0);
    e(this, "particles", /* @__PURE__ */ new Map());
    e(this, "size", h(1, 5));
    e(this, "life", h(10, 15));
    e(this, "speed", { x: h(-10, 10), y: h(-10, 10) });
    e(this, "colors", []);
    e(this, "opacity", h(50, 100));
    e(this, "fadeOut");
    e(this, "fadeIn");
    this.canvas = t, this.canvasSize = i, t.width = i.x, t.height = i.y;
  }
  static getRandomNumberInInterval(t) {
    const i = Math.ceil(t.min), a = Math.floor(t.max);
    return Math.floor(Math.random() * (a - i + 1)) + i;
  }
  static getRandomElementFromArray(t) {
    const i = Math.floor(Math.random() * t.length);
    return t[i];
  }
  createParticle() {
    const t = new m(this.lastId.toString(), this);
    t.position.x = n.getRandomNumberInInterval({ min: 0, max: this.canvasSize.x }), t.position.y = n.getRandomNumberInInterval({ min: 0, max: this.canvasSize.y }), t.size = n.getRandomNumberInInterval(this.size), t.life = n.getRandomNumberInInterval(this.life), t.speed.x = n.getRandomNumberInInterval(this.speed.x), t.speed.y = n.getRandomNumberInInterval(this.speed.y), t.color = n.getRandomElementFromArray(this.colors || new r("fff")), t.opacity = n.getRandomNumberInInterval(this.opacity), t.fadeOut = this.fadeOut, t.fadeIn = this.fadeIn, t.init(), this.particles.set(this.lastId.toString(), t), this.lastId++;
  }
  init() {
    const t = this.canvas.getContext("2d");
    for (let i = 0; i < this.ammount; i++) this.createParticle();
    setInterval(() => {
      if (this.particles.size < this.ammount)
        for (let i = this.particles.size; i < this.ammount; i++) this.createParticle();
      t == null || t.clearRect(0, 0, this.canvas.width, this.canvas.height), this.particles.forEach((i) => {
        t.fillStyle = i.color.toString(), t.globalAlpha = i.opacity / 100, t == null || t.beginPath(), t == null || t.arc(i.position.x, i.position.y, i.size / 2, 0, 2 * Math.PI, !1), t == null || t.closePath(), t == null || t.fill();
      });
    }, this.deltaTime);
  }
}
const H = {
  Particle: m,
  ParticleSystem: n,
  RGBA: p,
  HEX: r,
  range: h
};
export {
  H as default
};
