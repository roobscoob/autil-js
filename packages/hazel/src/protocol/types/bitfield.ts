import { BinaryObjectInstance, BinaryReader, BinaryWriter  } from "@autil/helpers";
import { Endianness } from "../../types/endianness";

export class Bitfield implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader, byteSize: number, endianness: Endianness = Endianness.LittleEndian) {
    const bytes = reader.readBytes(byteSize);

    return new Bitfield(bytes.getBuffer(), endianness);
  }

  static fromBooleanArray(booleanArray: boolean[], endianness: Endianness = Endianness.LittleEndian) {
    const size = Math.ceil(booleanArray.length/8);
    const bf = this.fromSize(size);

    for (let i = 0; i < booleanArray.length; i++) {
      bf.setFlag(i, booleanArray[i]);
    }

    return bf;
  }

  static fromSize(size: number, endianness: Endianness = Endianness.LittleEndian) {
    return new Bitfield(new DataView(new ArrayBuffer(size)), endianness);
  }

  private constructor(protected readonly bytes: DataView, protected readonly endianness: Endianness) {}

  getFlag(index: number) {
    let byteIndex = Math.floor(index / 8);
    let bitIndex = index % 8;

    if (this.endianness === Endianness.LittleEndian)
      byteIndex = Math.abs(byteIndex - this.bytes.byteLength) - 1;

    return ((this.bytes.getUint8(byteIndex) >> (Math.abs(bitIndex - 8) - 1)) & 0x01) === 1;
  }

  setFlag(index: number, value: boolean) {
    let byteIndex = Math.floor(index / 8);
    let bitIndex = index % 8;

    if (this.endianness === Endianness.LittleEndian)
      byteIndex = Math.abs(byteIndex - this.bytes.byteLength) - 1;

    let byte = this.bytes.getUint8(byteIndex);

    bitIndex = Math.abs(bitIndex - 8) - 1;

    if (value) {
      byte |= 1 << bitIndex;
    } else {
      byte &= ~(1 << bitIndex);
    }

    this.bytes.setUint8(byteIndex, byte);
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(this.bytes.byteLength);

    writer.writeBytes(this.bytes);

    return writer;
  }
}
