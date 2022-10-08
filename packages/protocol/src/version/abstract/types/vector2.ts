import { BinaryWriter } from "@autil/helpers";

export abstract class Vector2 {
  abstract getX(): number;
  abstract getY(): number;
}

export class Vector2Data extends Vector2 {
  constructor(protected readonly x: number, protected readonly y: number) { super() }

  getX() { return this.x }
  getY() { return this.y }
}
