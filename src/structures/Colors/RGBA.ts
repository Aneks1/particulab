import HEX from "./HEX"

export default class RGBA {
    public red: number
    public green: number
    public blue: number
    public alpha: number

    constructor(red: number, green: number, blue: number, alpha: number) {
        this.red = red
        this.green = green
        this.blue = blue
        this.alpha = alpha
        if(red > 255 || red < 0 || green > 255 || green < 0 || blue > 255 || blue < 0 || alpha > 1 || alpha < 0) throw new TypeError("Invalid rgba color.")
    }

    public toHex(): HEX {
        const rHex = this._componentToHex(this.red)
        const gHex = this._componentToHex(this.green)
        const bHex = this._componentToHex(this.blue)
        return new HEX(`#${rHex}${gHex}${bHex}`)
    }

    private _componentToHex(c: number): string {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    public toString(): string {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
    }
}