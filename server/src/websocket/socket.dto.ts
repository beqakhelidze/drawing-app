type Point = { x: number; y: number };

export class LineDto {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
  width: number;
}
