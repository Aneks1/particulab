import RGBA from "./RGBA";
export default class HEX {
    private hex;
    constructor(hex: string);
    toRGB(): RGBA;
    toString(): string;
}
