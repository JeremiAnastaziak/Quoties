export const drawRectangle = (canvas, vertices, padding, strokeStyle, fillStyle) => {
    console.log(drawRectangle);
    const ctx = canvas.getContext("2d");

    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(
            vertices[0].x,
            vertices[0].y - padding,
            vertices[1].x - vertices[0].x,
            vertices[2].y - vertices[0].y + 2 * padding
        );
        return;
    }

    ctx.strokeStyle = strokeStyle;
    ctx.rect(
        vertices[0].x,
        vertices[0].y - padding,
        vertices[1].x - vertices[0].x,
        vertices[2].y - vertices[0].y + 2 * padding
    );
    ctx.stroke();
}
