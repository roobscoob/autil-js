import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { Vector2 } from "../../abstract/types/vector2";
import { GameCode_V2018_11_14_0 } from "./gameCode";

export class Vector2_V2018_11_14_0 extends Vector2 {
  private static lerp(min: number, max: number, value: number): number {
    if (value < 0)
      value = 0;

    if (value > 1)
      value = 1;

    return min + (max - min) * value;
  }

  private static unlerp(min: number, max: number, value: number): number {
    var res = (value - min) / (max - min);

    if (res < 0)
      return 0;

    if (res > 1)
      return 1;

    return res;
  }

  static fromAbstract(data: Vector2) {
    return new Vector2_V2018_11_14_0(
      data.getX(),
      data.getY(),
    )
  }

  static deserialize(reader: BinaryReader) {
    return new Vector2_V2018_11_14_0(
      Vector2_V2018_11_14_0.lerp(-29, 24, reader.readUInt16LE()),
      Vector2_V2018_11_14_0.lerp(-22, 10, reader.readUInt16LE()),
    );
  }

  constructor(
    protected readonly x: number,
    protected readonly y: number,
  ) { super() }

  getX() { return this.x }
  getY() { return this.y }

  serialize(): BinaryWriter {
    const alloc = BinaryWriter.allocate(4);

    alloc.writeUInt16LE(Vector2_V2018_11_14_0.unlerp(-29, 24, this.getX()));
    alloc.writeUInt16LE(Vector2_V2018_11_14_0.unlerp(-22, 10, this.getY()));

    return alloc;
  }
}

export class FloatBasedVector2_V2018_11_14_0 extends Vector2 {
  static fromAbstract(data: Vector2) {
    return new FloatBasedVector2_V2018_11_14_0(
      data.getX(),
      data.getY(),
    )
  }

  static deserialize(reader: BinaryReader) {
    return new FloatBasedVector2_V2018_11_14_0(
      reader.readFloat32LE(),
      reader.readFloat32LE(),
    );
  }

  constructor(
    protected readonly x: number,
    protected readonly y: number,
  ) { super() }

  getX() { return this.x }
  getY() { return this.y }

  serialize(): BinaryWriter {
    const alloc = BinaryWriter.allocate(4);

    alloc.writeFloat32LE(this.getX());
    alloc.writeFloat32LE(this.getY());

    return alloc;
  }
}
