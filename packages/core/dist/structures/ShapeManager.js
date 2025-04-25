export default class ShapeManager {
    drawCircle(ctx, options) {
        ctx.beginPath();
        ctx.arc(options.position.x, options.position.y, options.size / 2, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }
    drawRectangle(ctx, options) {
        ctx.fillRect(options.position.x - options.size / 2, options.position.y - options.size / 2, options.size, options.size);
    }
    drawTriangle(ctx, options) {
        const height = (options.size * Math.sqrt(3)) / 2;
        ctx.beginPath();
        ctx.moveTo(options.position.x, options.position.y - height / 2);
        ctx.lineTo(options.position.x - options.size / 2, options.position.y + height / 2);
        ctx.lineTo(options.position.x + options.size / 2, options.position.y + height / 2);
        ctx.closePath();
        ctx.fill();
    }
    drawStar(ctx, options) {
        const spikes = 5;
        const outerRadius = options.size / 2;
        const innerRadius = outerRadius / 2.5;
        let angle = Math.PI / spikes;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            let radius = i % 2 === 0 ? outerRadius : innerRadius;
            let pointX = options.position.x + Math.cos(angle * i) * radius;
            let pointY = options.position.y + Math.sin(angle * i) * radius;
            ctx.lineTo(pointX, pointY);
        }
        ctx.closePath();
        ctx.fill();
    }
    drawImage(img, ctx, options) {
        ctx.drawImage(img.element, options.position.x - options.size / 2, options.position.y - options.size / 2, options.size, options.size);
    }
}
