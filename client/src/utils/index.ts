type DrawLineProps = Draw & {
  color: string;
  lineWidth: number;
};

export function drawLine({
  ctx,
  prevPoint,
  currentPoint,
  color = "black",
  lineWidth = 5,
}: DrawLineProps) {
  const { x: currX, y: currY } = currentPoint;
  const lineColor = color;

  let startPoint = prevPoint ?? currentPoint;

  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(startPoint?.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = lineColor;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(startPoint.x, startPoint.y, 0, 0, 2 * Math.PI);
  ctx.fill();
}
