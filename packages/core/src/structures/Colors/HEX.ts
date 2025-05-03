import RGBA from "./RGBA"

export default class HEX {
    private hex: string
    constructor(hex: string) {
        if (hex[0] === '#') {
            hex = hex.slice(1);
        }
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('')
        }
        this.hex = hex;
    }
    public toRGB(): RGBA {
        const r = parseInt(this.hex.slice(0, 2), 16)
        const g = parseInt(this.hex.slice(2, 4), 16)
        const b = parseInt(this.hex.slice(4, 6), 16)
        return new RGBA(r, g, b, 1);
    }
    public toString(): string {
        return `#${this.hex}`
    }
}