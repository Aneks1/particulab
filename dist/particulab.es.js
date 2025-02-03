var d = Object.defineProperty;
var p = (a, t, e) => t in a ? d(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var i = (a, t, e) => p(a, typeof t != "symbol" ? t + "" : t, e);
class l {
  constructor(t, e, n, h) {
    i(this, "red");
    i(this, "green");
    i(this, "blue");
    i(this, "alpha");
    if (this.red = t, this.green = e, this.blue = n, this.alpha = h, t > 255 || t < 0 || e > 255 || e < 0 || n > 255 || n < 0 || h > 1 || h < 0) throw new TypeError("Invalid rgba color.");
  }
  toHex() {
    const t = this._componentToHex(this.red), e = this._componentToHex(this.green), n = this._componentToHex(this.blue);
    return new r(`#${t}${e}${n}`);
  }
  _componentToHex(t) {
    const e = t.toString(16);
    return e.length === 1 ? "0" + e : e;
  }
  toString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}
class r {
  constructor(t) {
    i(this, "hex");
    t[0] === "#" && (t = t.slice(1)), t.length === 3 && (t = t.split("").map((e) => e + e).join("")), this.hex = t;
  }
  toRGB() {
    const t = parseInt(this.hex.slice(0, 2), 16), e = parseInt(this.hex.slice(2, 4), 16), n = parseInt(this.hex.slice(4, 6), 16);
    return new l(t, e, n, 1);
  }
  toString() {
    return `#${this.hex}`;
  }
}
class c {
  constructor(t, e) {
    i(this, "parent");
    i(this, "id");
    i(this, "position", { x: 0, y: 0 });
    i(this, "diameter", 0);
    i(this, "life", 0);
    i(this, "speed", { x: 0, y: 0 });
    i(this, "color", new r("#ffffff"));
    i(this, "opacity", 1);
    i(this, "deltaDiameter", 0);
    i(this, "deltaOpacity", 0);
    i(this, "fadeOut", {
      type: null,
      options: null
    });
    this.parent = e, this.id = t;
  }
  init() {
    if (this.fadeOut.type && this.fadeOut.options) {
      if (this.fadeOut.type == "opacity" || this.fadeOut.type == "opacity-scale") {
        const e = this.fadeOut.options;
        this.deltaOpacity = (e.targetOpacity - this.opacity) / e.duration;
      }
      if (this.fadeOut.type == "scale" || this.fadeOut.type == "opacity-scale") {
        const e = this.fadeOut.options;
        this.deltaDiameter = (e.targetScaleFactor * this.diameter - this.diameter) / e.duration;
      }
    }
    const t = setInterval(() => {
      this.position.x += this.speed.x * 60 / 1e3, this.position.y -= this.speed.y * 60 / 1e3, this.life -= 1 / 60, this.fadeOut.type && this.fadeOut.options && this.life <= this.fadeOut.options.duration && (this.opacity += this.deltaOpacity * (1 / 60), this.opacity = Math.max(0, Math.min(1, this.opacity)), this.diameter += this.deltaDiameter * (1 / 60), this.diameter = Math.max(0, this.diameter)), this.life <= 0 && (clearInterval(t), this.parent.particles.delete(this.id));
    }, this.parent.deltaTime);
  }
}
function o(a, t) {
  return { min: a, max: t };
}
class s {
  constructor(t, e) {
    i(this, "canvas");
    i(this, "size");
    i(this, "lastId", 0);
    i(this, "deltaTime", 1e3 / 60);
    i(this, "ammount", 0);
    i(this, "particles", /* @__PURE__ */ new Map());
    i(this, "diameter", o(1, 5));
    i(this, "life", o(10, 15));
    i(this, "speed", { x: o(-10, 10), y: o(-10, 10) });
    i(this, "colors", []);
    i(this, "opacity", o(0.5, 1));
    i(this, "fadeOut", {
      type: null,
      options: null
    });
    this.canvas = t, this.size = e, t.width = e.x, t.height = e.y;
  }
  static getRandomNumberInInterval(t) {
    const e = Math.ceil(t.min), n = Math.floor(t.max);
    return Math.floor(Math.random() * (n - e + 1)) + e;
  }
  static getRandomElementFromArray(t) {
    const e = Math.floor(Math.random() * t.length);
    return t[e];
  }
  createParticle() {
    const t = new c(this.lastId.toString(), this);
    t.position.x = s.getRandomNumberInInterval({ min: 0, max: this.size.x }), t.position.y = s.getRandomNumberInInterval({ min: 0, max: this.size.y }), t.diameter = s.getRandomNumberInInterval(this.diameter), t.life = s.getRandomNumberInInterval(this.life), t.speed.x = s.getRandomNumberInInterval(this.speed.x), t.speed.y = s.getRandomNumberInInterval(this.speed.y), t.color = s.getRandomElementFromArray(this.colors || new r("fff")), t.opacity = s.getRandomNumberInInterval(this.opacity), t.fadeOut = this.fadeOut, t.init(), this.particles.set(this.lastId.toString(), t), this.lastId++;
  }
  setFadeOutType(t, e) {
    if (t == "opacity" && e.targetOpacity < 0 || e.targetOpacity > 1 || t == "opacity-scale" && e.targetOpacity < 0 || e.targetOpacity > 1)
      throw new Error("targetOpacity must be between 0 and 1");
    if (t == "scale" && e.targetScaleFactor < 0 || t == "opacity-scale" && e.targetScaleFactor < 0)
      throw new Error("targetScaleFactot must be greater than 0");
    this.fadeOut = {
      type: t,
      options: e
    };
  }
  init() {
    const t = this.canvas.getContext("2d");
    for (let e = 0; e < this.ammount; e++) this.createParticle();
    setInterval(() => {
      if (this.particles.size < this.ammount)
        for (let e = this.particles.size; e < this.ammount; e++) this.createParticle();
      t == null || t.clearRect(0, 0, this.canvas.width, this.canvas.height), this.particles.forEach((e) => {
        t.fillStyle = e.color.toString(), t.globalAlpha = e.opacity, t == null || t.beginPath(), t == null || t.arc(e.position.x, e.position.y, e.diameter / 2, 0, 2 * Math.PI, !1), t == null || t.closePath(), t == null || t.fill();
      });
    }, this.deltaTime);
  }
}
const f = {
  Particle: c,
  ParticleSystem: s,
  RGBA: l,
  HEX: r,
  range: o
};
export {
  f as default
};
