import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export class MessageWriter extends BinaryWriter implements BinaryObjectInstance {
  static allocate(size: number): MessageWriter {
    return new MessageWriter(0, new ArrayBuffer(size));
  }

  static allocateTagged(tag: number, size: number): MessageWriter {
    return new MessageWriter(tag, new ArrayBuffer(size));
  }

  static from(buffer: Buffer | DataView | ArrayBuffer): MessageWriter {
    if (buffer instanceof ArrayBuffer)
      return new MessageWriter(0, buffer);

    return this.from(buffer.buffer);
  }

  static fromTagged(tag: number, buffer: Buffer | DataView | ArrayBuffer): MessageWriter {
    if (buffer instanceof ArrayBuffer)
      return new MessageWriter(tag, buffer);

    return this.fromTagged(tag, buffer.buffer);
  }

  protected constructor(protected readonly tag: number, bufferSrc: ArrayBuffer) {
    super(bufferSrc);
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(3 + this.buffer.byteLength);

    writer.writeUInt16LE(this.getBuffer().byteLength);
    writer.writeUInt8(this.getTag());
    writer.writeBytes(this.getBuffer());

    return writer;
  }

  getTag(): number {
    return this.tag;
  }
}
