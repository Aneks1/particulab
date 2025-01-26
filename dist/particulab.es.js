var r = Object.defineProperty;
var o = (a, t, i) => t in a ? r(a, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : a[t] = i;
var e = (a, t, i) => o(a, typeof t != "symbol" ? t + "" : t, i);
class n {
  constructor(t, i) {
    e(this, "parent");
    e(this, "id");
    e(this, "position", { x: 0, y: 0 });
    e(this, "diameter", 0);
    e(this, "life", 0);
    e(this, "speed", { x: 0, y: 0 });
    this.parent = i, this.id = t, this.init();
  }
  init() {
    const t = setInterval(() => {
      this.position.x += this.speed.x * 60 / 1e3, this.position.y -= this.speed.y * 60 / 1e3, this.life -= 0.016666666666666666, this.life <= 0 && (clearInterval(t), this.parent.particles.delete(this.id));
    }, 16.666666666666668);
  }
}
class s {
  constructor(t, i) {
    e(this, "canvas");
    e(this, "size");
    e(this, "lastId", 0);
    e(this, "ammount", 0);
    e(this, "particles", /* @__PURE__ */ new Map());
    e(this, "diameter", { min: 0, max: 0 });
    e(this, "life", { min: 0, max: 0 });
    e(this, "speed", { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } });
    this.canvas = t, this.size = i, t.width = i.x, t.height = i.y;
  }
  static getRandomNumberInInterval(t) {
    const i = Math.ceil(t.min), h = Math.floor(t.max);
    return Math.floor(Math.random() * (h - i + 1)) + i;
  }
  createParticle() {
    const t = new n(this.lastId.toString(), this);
    t.position.x = s.getRandomNumberInInterval({ min: 0, max: this.size.x }), t.position.y = s.getRandomNumberInInterval({ min: 0, max: this.size.y }), t.diameter = s.getRandomNumberInInterval(this.diameter), t.life = s.getRandomNumberInInterval(this.life), t.speed.x = s.getRandomNumberInInterval(this.speed.x), t.speed.y = s.getRandomNumberInInterval(this.speed.y), this.particles.set(this.lastId.toString(), t), this.lastId++;
  }
  init() {
    const t = this.canvas.getContext("2d");
    t.fillStyle = "white";
    for (let i = 0; i < this.ammount; i++) this.createParticle();
    setInterval(() => {
      if (this.particles.size < this.ammount)
        for (let i = this.particles.size; i < this.ammount; i++) this.createParticle();
      t == null || t.clearRect(0, 0, this.canvas.width, this.canvas.height), this.particles.forEach((i) => {
        t == null || t.beginPath(), t == null || t.arc(i.position.x, i.position.y, i.diameter / 2, 0, 2 * Math.PI, !1), t == null || t.closePath(), t == null || t.fill();
      });
    }, 1e3 / 60);
  }
}
const m = {
  Particle: n,
  ParticleSystem: s
};
export {
  m as default
};
