import { Vector } from "..";
export default class Vector2 implements Vector {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(...vectors: Vector[]): this;
    subtract(...vectors: Vector[]): this;
    multiply(...scalars: number[]): this;
    divide(...scalars: number[]): this;
    dot(vector: Vector): number;
    equals(vector: Vector): boolean;
    get magnitude(): number;
    get magnitudeSquared(): number;
    normalize(): this;
    get normalized(): Vector2;
    get angle(): number;
    clone(): Vector2;
    set(x: number, y: number): this;
    toArray(): [number, number];
    static add(...vectors: Vector[]): Vector2;
    static subtract(initial: Vector, ...vectors: Vector[]): Vector2;
    static multiply(initial: Vector, ...scalars: number[]): Vector2;
    static divide(initial: Vector, ...scalars: number[]): Vector2;
    static magnitude(vector: Vector): number;
    static magnitudeSquared(vector: Vector): number;
    static normalize(vector: Vector): Vector2;
    static dot(vector1: Vector, vector2: Vector): number;
    static equals(vector1: Vector, vector2: Vector): boolean;
    static angleBetween(vector1: Vector, vector2: Vector): number;
    static from(vector: Vector): Vector2;
    static zero(): Vector2;
    /**
     * @param angle Angle in radians
     */
    static fromAngle(angle: number, magnitude?: number): Vector2;
}
