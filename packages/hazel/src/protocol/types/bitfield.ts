import { BinaryObjectInstance, BinaryReader, BinaryWriter  } from "@autil/helpers";
import { Endianness } from "../../types/endianness";

export class Bitfield implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader, byteSize: number, endianness: Endianness = Endianness.LittleEndian) {
    const bytes = reader.readBytes(byteSize);

    return new Bitfield(bytes.getBuffer(), endianness);
  }

  private constructor(protected readonly bytes: DataView, protected readonly endianness: Endianness) {}

  getFlag(index: number) {
    let byteIndex = Math.floor(index / 8);
    let bitIndex = index % 8;

    if (this.endianness === Endianness.LittleEndian)
      byteIndex = Math.abs(byteIndex - this.bytes.byteLength);

    return (this.bytes.getUint8(byteIndex) >> Math.abs(bitIndex - 8)) & 0x01;
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(this.bytes.byteLength);

    writer.writeBytes(this.bytes);

    return writer;
  }
}
