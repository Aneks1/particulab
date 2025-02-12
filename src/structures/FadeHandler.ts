import FadeOptions from "./FadeOptions"
import Particle from "./Particle"

export default class FadeHandler {
    public parent: Particle
    public options: FadeOptions
    public deltaSize = 0
    public deltaOpacity = 0
    constructor(parent: Particle, options: FadeOptions) {
        if (options.opacity == undefined && options.scaleFactor == undefined) throw new TypeError("Can not create a FadeHandler with opacity and scaleFactor both undefined .")
        this.parent = parent
        this.options = options
    }
}

export class FadeOutHandler extends FadeHandler {
    constructor(parent: Particle, options: FadeOptions) {
        super(parent, options)
        this.calculateDeltas()
    }

    public calculateDeltas() {
        if(this.options.opacity != undefined) this.deltaOpacity = (this.options.opacity - this.parent.opacity) / this.options.duration;
        if(this.options.scaleFactor != undefined) this.deltaSize = (this.options.scaleFactor * this.parent.size - this.parent.size) / this.options.duration;
    }
}

export class FadeInHandler extends FadeHandler {
    public initialLife: number
    constructor(parent: Particle, options: FadeOptions) {
        super(parent, options)
        this.calculateDeltas()
        this.initialLife = this.parent.life
    }

    public calculateDeltas() {
        if(this.options.opacity != undefined) this.deltaOpacity = ( this.parent.opacity - this.options.opacity) / this.options.duration;
        if(this.options.scaleFactor != undefined) this.deltaSize = (this.parent.size - this.options.scaleFactor * this.parent.size) / this.options.duration;
    }
}