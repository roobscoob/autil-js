import { BinaryWriter } from "..";
import { BinaryReaderStarvationError, BinaryObject, BinaryObjectInstance } from "./";

export class BinaryReader {
  static from(buffer: Buffer | DataView | ArrayBuffer | BinaryWriter): BinaryReader {
    if (buffer instanceof ArrayBuffer)
      return new BinaryReader(buffer);

    if (buffer instanceof BinaryWriter)
      return this.from(buffer.getBuffer());

    return this.from(buffer.buffer);
  }

  protected constructor(bufferIn: ArrayBuffer) {
    this.buffer = new DataView(bufferIn);
  }

  protected buffer: DataView;
  protected readHead: number = 0;

  private incrHead(value: number): number {
    if (!this.hasBytesLeftToRead(value - 1))
      throw new BinaryReaderStarvationError(value);

    const temp = this.readHead;
    this.readHead += value;
    return temp;
  }

  private incrHeadRange(value: number): [ number, number ] {
    if (!this.hasBytesLeftToRead(value - 1))
      throw new BinaryReaderStarvationError(value);

    const temp = this.readHead;
    this.readHead += value;
    return [temp, this.readHead];
  }

  getBuffer() {
    return this.buffer;
  }

  clone() {
    return BinaryReader.from(this.getBuffer());
  }

  hasBytesLeftToRead(plus: number = 0): boolean { return (this.readHead + plus) < this.buffer.byteLength }

  countRemainingBytes() { return this.buffer.byteLength - this.readHead }

  readBoolean(): boolean { return this.readUInt8() !== 0 }

  readSInt8(): number { return this.buffer.getInt8(this.incrHead(1)) }
  readUInt8(): number { return this.buffer.getUint8(this.incrHead(1)) }
  readSInt16LE(): number { return this.buffer.getInt16(this.incrHead(2), true) }
  readUInt16LE(): number { return this.buffer.getUint16(this.incrHead(2), true) }
  readSInt16BE(): number { return this.buffer.getInt16(this.incrHead(2), false) }
  readUInt16BE(): number { return this.buffer.getUint16(this.incrHead(2), false) }

  readUInt24BE(): number {
    return (this.readUInt8() << 16) | (this.readUInt8() << 8) | this.readUInt8();
  }

  readUInt24LE(): number {
    return this.readUInt8() | (this.readUInt8() << 8) | (this.readUInt8() << 16);
  }

  readSInt32LE(): number { return this.buffer.getInt32(this.incrHead(4), true) }
  readUInt32LE(): number { return this.buffer.getUint32(this.incrHead(4), true) }
  readSInt32BE(): number { return this.buffer.getInt32(this.incrHead(4), false) }
  readUInt32BE(): number { return this.buffer.getUint32(this.incrHead(4), false) }

  readUInt48BE(): number {
    return (this.readUInt8() << 40) | (this.readUInt8() << 32) | (this.readUInt8() << 24) | (this.readUInt8() << 16) | (this.readUInt8() << 8) | this.readUInt8()
  }
  readUInt48LE(): number {
    return this.readUInt8() | (this.readUInt8() << 8) | (this.readUInt8() << 16) | (this.readUInt8() << 24) | (this.readUInt8() << 32) | (this.readUInt8() << 40)
  }

  readFloat32LE(): number { return this.buffer.getFloat32(this.incrHead(4), true) }
  readFloat32BE(): number { return this.buffer.getFloat32(this.incrHead(4), false) }
  readFloat64LE(): number { return this.buffer.getFloat64(this.incrHead(8), true) }
  readFloat64BE(): number { return this.buffer.getFloat64(this.incrHead(8), false) }

  readPackedInt32(): number {
    let readMore = true;
    let shift = 0;
    let output = 0;

    while (readMore) {
      let next = this.readUInt8();

      if (next >= 0x80) {
        readMore = true;
        next ^= 0x80;
      } else {
        readMore = false;
      }

      output |= next << shift;
      shift += 7;
    }

    return output;
  }

  readPackedUInt32(): number { return this.readPackedInt32() >>> 0 }

  readBytes(length: number) { return BinaryReader.from(this.buffer.buffer.slice(...this.incrHeadRange(length))) }

  readString(length: number): string { return new TextDecoder().decode(this.readBytes(length).getBuffer().buffer) }

  read<T extends BinaryObject<any, any>>(object: T, ...args: T extends BinaryObject<any, infer ArgT> ? ArgT : []): T["prototype"] { return object.deserialize(this, ...(args as any)) }

  *readRemaining<T extends BinaryObjectInstance>(readFn: (reader: BinaryReader) => T): Generator<T> {
    while (this.hasBytesLeftToRead()) {
      yield readFn(this);
    }
  }
}
