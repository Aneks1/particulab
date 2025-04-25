import RGBA from "./RGBA";
export default class HEX {
    hex: string;
    constructor(hex: string);
    toRGB(): RGBA;
    toString(): string;
}
