export default class FadeHandler {
    parent;
    options;
    deltaSize = 0;
    deltaOpacity = 0;
    constructor(parent, options) {
        if (options.opacity == undefined && options.scaleFactor == undefined)
            throw new TypeError("Can not create a FadeHandler with opacity and scaleFactor both undefined .");
        this.parent = parent;
        this.options = options;
    }
}
export class FadeOutHandler extends FadeHandler {
    constructor(parent, options) {
        super(parent, options);
        this.calculateDeltas();
    }
    calculateDeltas() {
        if (this.options.opacity != undefined)
            this.deltaOpacity = (this.options.opacity - this.parent.opacity) / this.options.duration;
        if (this.options.scaleFactor != undefined)
            this.deltaSize = (this.options.scaleFactor * this.parent.size - this.parent.size) / this.options.duration;
    }
}
export class FadeInHandler extends FadeHandler {
    constructor(parent, options) {
        super(parent, options);
        this.calculateDeltas();
    }
    calculateDeltas() {
        if (this.options.opacity != undefined)
            this.deltaOpacity = (this.parent.opacity - this.options.opacity) / this.options.duration;
        if (this.options.scaleFactor != undefined)
            this.deltaSize = (this.parent.size - this.options.scaleFactor * this.parent.size) / this.options.duration;
    }
}
