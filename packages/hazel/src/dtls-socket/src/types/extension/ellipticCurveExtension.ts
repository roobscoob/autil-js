import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export class EllipticCurveExtensionData implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): EllipticCurveExtensionData {
    const curveCount = reader.readUInt16BE() / 2;
    const curves: number[] = []

    for (let i = 0; i < curveCount; i++) {
      curves.push(reader.readUInt16BE());
    }

    return new EllipticCurveExtensionData(curves);
  }

  constructor(protected readonly curves: number[]) {}

  getCurves() { return this.curves }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(2 + (this.curves.length * 2));

    writer.writeUInt16BE(this.curves.length * 2);

    for (const curve of this.curves) {
      writer.writeUInt16BE(curve);
    }

    return writer;
  }
}
