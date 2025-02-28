import ShapeOptions from "./Options/ShapeOptions";
import ParticleImage from "./ParticleImage";
export default class ShapeManager {
    drawCircle(ctx: CanvasRenderingContext2D, options: ShapeOptions): void;
    drawRectangle(ctx: CanvasRenderingContext2D, options: ShapeOptions): void;
    drawTriangle(ctx: CanvasRenderingContext2D, options: ShapeOptions): void;
    drawStar(ctx: CanvasRenderingContext2D, options: ShapeOptions): void;
    drawImage(img: ParticleImage, ctx: CanvasRenderingContext2D, options: ShapeOptions): void;
}
