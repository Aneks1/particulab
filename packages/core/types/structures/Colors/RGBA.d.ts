import HEX from "./HEX";
export default class RGBA {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    constructor(red: number, green: number, blue: number, alpha: number);
    toHex(): HEX;
    private _componentToHex;
    toString(): string;
}
