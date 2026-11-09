import { Coordinates, FnInterval, Condition } from "..";
import Vector2 from "./Vector2";
import EmitterOptions from "./Options/EmitterOptions";
export default class Emitter<T extends Coordinates = "cartesian"> {
    readonly coordinates: EmitterOptions<T>["coordinates"];
    readonly fn: EmitterOptions<T>["fn"];
    readonly domain: FnInterval;
    readonly range: FnInterval;
    readonly condition: Condition;
    readonly position: Vector2;
    readonly debug: boolean;
    readonly scale: Vector2;
    constructor(options: EmitterOptions<T>);
    private evaluate;
    /** Checks the domain, range and inequality in the selected coordinate system. */
    contains(value: number, result: number): boolean;
    private toCartesian;
    private toCanvas;
    /** Draw a small filled polygon in local function coordinates. */
    private fillStrip;
    /** Renders y=f(x) or r=f(theta) without joining non-finite or clipped points. */
    private drawCurve;
    private drawCartesianDebug;
    private drawPolarDebug;
    drawDebug(ctx: CanvasRenderingContext2D, resolution?: number): void;
}
