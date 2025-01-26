var m = Object.defineProperty;
var c = (o, t, e) => t in o ? m(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var i = (o, t, e) => c(o, typeof t != "symbol" ? t + "" : t, e);
class a {
  constructor(t, e, s, r) {
    i(this, "red");
    i(this, "green");
    i(this, "blue");
    i(this, "alpha");
    if (this.red = t, this.green = e, this.blue = s, this.alpha = r, t > 255 || t < 0 || e > 255 || e < 0 || s > 255 || s < 0 || r > 1 || r < 0) throw new TypeError("Invalid rgba color.");
  }
  toHex() {
    const t = this._componentToHex(this.red), e = this._componentToHex(this.green), s = this._componentToHex(this.blue);
    return `#${t}${e}${s}`;
  }
  _componentToHex(t) {
    const e = t.toString(16);
    return e.length === 1 ? "0" + e : e;
  }
  toString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}
class h {
  constructor(t) {
    i(this, "hex");
    t[0] === "#" && (t = t.slice(1)), t.length === 3 && (t = t.split("").map((e) => e + e).join("")), this.hex = t;
  }
  toRGB() {
    const t = parseInt(this.hex.slice(0, 2), 16), e = parseInt(this.hex.slice(2, 4), 16), s = parseInt(this.hex.slice(4, 6), 16);
    return new a(t, e, s, 1);
  }
  toString() {
    return `#${this.hex}`;
  }
}
class l {
  constructor(t, e) {
    i(this, "parent");
    i(this, "id");
    i(this, "position", { x: 0, y: 0 });
    i(this, "diameter", 0);
    i(this, "life", 0);
    i(this, "speed", { x: 0, y: 0 });
    i(this, "color", new h("#ffffff"));
    this.parent = e, this.id = t, this.init();
  }
  init() {
    const t = setInterval(() => {
      this.position.x += this.speed.x * 60 / 1e3, this.position.y -= this.speed.y * 60 / 1e3, this.life -= 0.016666666666666666, this.life <= 0 && (clearInterval(t), this.parent.particles.delete(this.id));
    }, 16.666666666666668);
  }
}
class n {
  constructor(t, e) {
    i(this, "canvas");
    i(this, "size");
    i(this, "lastId", 0);
    i(this, "ammount", 0);
    i(this, "particles", /* @__PURE__ */ new Map());
    i(this, "diameter", { min: 0, max: 0 });
    i(this, "life", { min: 0, max: 0 });
    i(this, "speed", { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } });
    i(this, "colors", []);
    this.canvas = t, this.size = e, t.width = e.x, t.height = e.y;
  }
  static getRandomNumberInInterval(t) {
    const e = Math.ceil(t.min), s = Math.floor(t.max);
    return Math.floor(Math.random() * (s - e + 1)) + e;
  }
  static getRandomElementFromArray(t) {
    const e = Math.floor(Math.random() * t.length);
    return t[e];
  }
  createParticle() {
    const t = new l(this.lastId.toString(), this);
    t.position.x = n.getRandomNumberInInterval({ min: 0, max: this.size.x }), t.position.y = n.getRandomNumberInInterval({ min: 0, max: this.size.y }), t.diameter = n.getRandomNumberInInterval(this.diameter), t.life = n.getRandomNumberInInterval(this.life), t.speed.x = n.getRandomNumberInInterval(this.speed.x), t.speed.y = n.getRandomNumberInInterval(this.speed.y), t.color = n.getRandomElementFromArray(this.colors), this.particles.set(this.lastId.toString(), t), this.lastId++;
  }
  init() {
    const t = this.canvas.getContext("2d");
    for (let e = 0; e < this.ammount; e++) this.createParticle();
    setInterval(() => {
      if (this.particles.size < this.ammount)
        for (let e = this.particles.size; e < this.ammount; e++) this.createParticle();
      t == null || t.clearRect(0, 0, this.canvas.width, this.canvas.height), this.particles.forEach((e) => {
        t.fillStyle = e.color.toString(), t == null || t.beginPath(), t == null || t.arc(e.position.x, e.position.y, e.diameter / 2, 0, 2 * Math.PI, !1), t == null || t.closePath(), t == null || t.fill();
      });
    }, 1e3 / 60);
  }
}
const p = {
  Particle: l,
  ParticleSystem: n,
  RGBA: a,
  HEX: h
};
export {
  p as default
};
