import { Vector } from ".."

export default class Vector2 implements Vector {
    public x: number
    public y: number
    
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    // Mathematic Operations

    public add(...vectors: Vector[]): this {
        for(const v of vectors) {
            this.x += v.x
            this.y += v.y
        }
        return this
    }

    public subtract(...vectors: Vector[]): this {
        for(const v of vectors) {
            this.x -= v.x
            this.y -= v.y
        }
        return this
    }

    public multiply(...scalars: number[]): this {
        for(const s of scalars) {
            this.x *= s
            this.y *= s
        }
        return this
    }

    public divide(...scalars: number[]): this {
        for(const s of scalars) {
            if(s === 0) {
                throw new RangeError("Cannot divide by zero")
            }
            this.x /= s
            this.y /= s
        }
        return this
    }

    public dot(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y
    }

    public equals(vector: Vector): boolean {
        return this.x === vector.x && this.y === vector.y
    }

    // Vector Data

    public get magnitude(): number {
        return Math.hypot(this.x, this.y)
    }

    public get magnitudeSquared(): number {
        return this.x**2 + this.y**2
    }

    public normalize(): this {
        const m = this.magnitude
        this.x = m === 0 ? 0 : this.x / m
        this.y = m === 0 ? 0 : this.y / m
        return this
    }

    public get normalized(): Vector2 {
        if (this.magnitude === 0) return new Vector2(0, 0)
        return new Vector2(this.x/this.magnitude, this.y/this.magnitude)
    }

    public get angle(): number {
        return Math.atan2(this.y, this.x)
    }

    // OOP Utilities

    public clone(): Vector2 {
        return new Vector2(this.x, this.y)
    }

    public set(x: number, y: number) {
        this.x = x
        this.y = y
        return this
    }

    public toArray(): [number, number] {
        return [this.x, this.y]
    }

    // Static Methods

    public static add(...vectors: Vector[]): Vector2 {
        return new Vector2(0,0).add(...vectors)
    }

    public static subtract(initial: Vector, ...vectors: Vector[]): Vector2 {
        return Vector2.from(initial).subtract(...vectors)
    }

    public static multiply(initial: Vector, ...scalars: number[]): Vector2 {
        return Vector2.from(initial).multiply(...scalars)
    }

    public static divide(initial: Vector, ...scalars: number[]): Vector2 {
        return Vector2.from(initial).divide(...scalars)
    }

    public static magnitude(vector: Vector): number {
        return Math.hypot(vector.x, vector.y)
    }

    public static magnitudeSquared(vector: Vector): number {
        return Vector2.from(vector).magnitudeSquared
    }

    public static normalize(vector: Vector): Vector2 {
        return Vector2.from(vector).normalize()
    }

    public static dot(vector1: Vector, vector2: Vector): number {
        return Vector2.from(vector1).dot(vector2)
    }

    public static equals(vector1: Vector, vector2: Vector): boolean {
        return Vector2.from(vector1).equals(vector2)
    }

    public static angleBetween(vector1: Vector, vector2: Vector): number {
        const m1 = Vector2.magnitude(vector1)
        const m2 = Vector2.magnitude(vector2)

        if (m1 === 0 || m2 === 0) {
            throw new RangeError("Cannot calculate angle between zero vectors")
        }

        const cos = Vector2.dot(vector1, vector2) / (m1 * m2)
        return Math.acos(Math.max(-1, Math.min(1, cos)))
    }

    // Vector2 creation

    public static from(vector: Vector): Vector2 {
        return new Vector2(vector.x, vector.y)
    }

    public static zero(): Vector2 {
        return new Vector2(0, 0)
    }

    /**
     * @param angle Angle in radians
     */
    public static fromAngle(angle: number, magnitude: number = 1): Vector2 {
        return new Vector2(magnitude*Math.cos(angle), magnitude*Math.sin(angle))
    }
}