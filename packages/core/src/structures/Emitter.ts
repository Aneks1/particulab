import { Coordinates, FnInterval, Condition, Vector } from "..";
import Vector2 from "./Vector2";
import EmitterOptions from "./Options/EmitterOptions";

export default class Emitter<T extends Coordinates = "cartesian"> {
    public readonly coordinates: EmitterOptions<T>["coordinates"]
    public readonly fn: EmitterOptions<T>["fn"]
    public readonly domain: FnInterval
    public readonly range: FnInterval
    public readonly condition: Condition
    public readonly position: Vector2
    public readonly debug: boolean
    public readonly scale: Vector2

    constructor(options: EmitterOptions<T>) {
        this.coordinates = options.coordinates
        this.fn = options.fn
        this.domain = options.domain
        this.range = options.range
        this.condition = options.condition ?? "equal"
        this.position = Vector2.from(options.position ?? Vector2.zero())
        this.debug = options.debug ?? false
        this.scale = Vector2.from(options.scale ?? { x: 1, y: 1 })
    }

    private evaluate(value: number): number {
        return this.fn(value)
    }

    /** Checks the domain, range and inequality in the selected coordinate system. */
    public contains(value: number, result: number): boolean {
        if (!Number.isFinite(value) || !Number.isFinite(result)) return false
        if (value < this.domain[0] || value > this.domain[1]) return false
        if (result < this.range[0] || result > this.range[1]) return false

        const boundary = this.evaluate(value)
        if (!Number.isFinite(boundary)) return false

        switch (this.condition) {
            case "greater": return result > boundary
            case "lower": return result < boundary
            case "equal": return Math.abs(result - boundary) < 1e-9
        }
    }

    private toCartesian(value: number, result: number): Vector2 {
        if (this.coordinates === "cartesian") {
            return new Vector2(value, result)
        }
        return Vector2.fromAngle(value, result)
    }

    private toCanvas(point: Vector2, canvasHeight: number): Vector {
        return {
            x: this.position.x + point.x * this.scale.x,
            y: canvasHeight - (this.position.y + point.y * this.scale.y)
        }
    }

    /** Draw a small filled polygon in local function coordinates. */
    private fillStrip(
        ctx: CanvasRenderingContext2D,
        vertices: [number, number][],
    ): void {
        ctx.beginPath()
        for (let i = 0; i < vertices.length; i++) {
            const [value, result] = vertices[i]
            const screen = this.toCanvas(
                this.toCartesian(value, result), ctx.canvas.height
            )
            if (i === 0) ctx.moveTo(screen.x, screen.y)
            else ctx.lineTo(screen.x, screen.y)
        }
        ctx.closePath()
        ctx.fill()
    }

    /** Renders y=f(x) or r=f(theta) without joining non-finite or clipped points. */
    private drawCurve(ctx: CanvasRenderingContext2D, resolution: number): void {
        const [min, max] = this.domain
        const [low, high] = this.range
        let drawing = false

        ctx.beginPath()
        for (let i = 0; i <= resolution; i++) {
            const value = min + (max - min) * i / resolution
            const result = this.evaluate(value)
            if (!Number.isFinite(result) || result < low || result > high) {
                drawing = false
                continue
            }
            const screen = this.toCanvas(
                this.toCartesian(value, result), ctx.canvas.height
            )
            if (!drawing) ctx.moveTo(screen.x, screen.y)
            else ctx.lineTo(screen.x, screen.y)
            drawing = true
        }
        ctx.strokeStyle = "#00ffff"
        ctx.lineWidth = 1.5
        ctx.stroke()
    }

    private drawCartesianDebug(ctx: CanvasRenderingContext2D, resolution: number): void {
        if (this.condition === "equal") {
            this.drawCurve(ctx, resolution)
            return
        }

        const [min, max] = this.domain
        const [low, high] = this.range
        const edge = this.condition === "greater" ? high : low

        for (let i = 0; i < resolution; i++) {
            const x0 = min + (max - min) * i / resolution
            const x1 = min + (max - min) * (i + 1) / resolution
            const f0 = this.evaluate(x0)
            const f1 = this.evaluate(x1)
            if (!Number.isFinite(f0) || !Number.isFinite(f1)) continue

            const y0 = Math.max(low, Math.min(high, f0))
            const y1 = Math.max(low, Math.min(high, f1))

            // If the inequality is impossible at both ends, skip this strip.
            if (this.condition === "greater" && f0 >= high && f1 >= high) continue
            if (this.condition === "lower" && f0 <= low && f1 <= low) continue

            this.fillStrip(ctx, [
                [x0, y0], [x1, y1], [x1, edge], [x0, edge]
            ])
        }
    }

    private drawPolarDebug(ctx: CanvasRenderingContext2D, resolution: number): void {
        if (this.condition === "equal") {
            this.drawCurve(ctx, resolution)
            return
        }

        const [minTheta, maxTheta] = this.domain
        const [minRadius, maxRadius] = this.range
        // For filled polar regions, radii must be non-negative to avoid
        // overlapping representations of the same Cartesian position.
        if (minRadius < 0 || maxRadius < minRadius) {
            throw new RangeError("Polar region debug requires a non-negative, ascending radial range")
        }

        const edge = this.condition === "greater" ? maxRadius : minRadius

        for (let i = 0; i < resolution; i++) {
            const a0 = minTheta + (maxTheta - minTheta) * i / resolution
            const a1 = minTheta + (maxTheta - minTheta) * (i + 1) / resolution
            const f0 = this.evaluate(a0)
            const f1 = this.evaluate(a1)
            if (!Number.isFinite(f0) || !Number.isFinite(f1)) continue

            const r0 = Math.max(minRadius, Math.min(maxRadius, f0))
            const r1 = Math.max(minRadius, Math.min(maxRadius, f1))

            if (this.condition === "greater" && f0 >= maxRadius && f1 >= maxRadius) continue
            if (this.condition === "lower" && f0 <= minRadius && f1 <= minRadius) continue

            // A thin annular sector, mapped to Canvas via toCartesian/toCanvas.
            this.fillStrip(ctx, [
                [a0, r0], [a1, r1], [a1, edge], [a0, edge]
            ])
        }
    }

    public drawDebug(ctx: CanvasRenderingContext2D, resolution = 200): void {
        if (!this.debug) return
        if (!Number.isInteger(resolution) || resolution < 1) {
            throw new RangeError("Debug resolution must be a positive integer")
        }

        ctx.save()
        try {
            ctx.globalAlpha = 1
            ctx.fillStyle = "rgba(0, 255, 255, 0.18)"
            if (this.coordinates === "cartesian") {
                this.drawCartesianDebug(ctx, resolution)
            } else {
                this.drawPolarDebug(ctx, resolution)
            }
        } finally {
            ctx.restore()
        }
    }
}
