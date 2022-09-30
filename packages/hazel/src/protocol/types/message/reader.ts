import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export class MessageReader extends BinaryReader implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): MessageReader {
    const length = reader.readUInt16LE();

    return new MessageReader(
      reader.readUInt8(),
      reader.readBytes(length).getBuffer().buffer,
    );
  }

  static from(buffer: Buffer | DataView | ArrayBuffer): BinaryReader {
    if (buffer instanceof ArrayBuffer)
      return new MessageReader(0, buffer);

    return this.from(buffer.buffer);
  }

  static fromTagged(tag: number, buffer: Buffer | DataView | ArrayBuffer): BinaryReader {
    if (buffer instanceof ArrayBuffer)
      return new MessageReader(tag, buffer);

    return this.fromTagged(tag, buffer.buffer);
  }

  protected constructor(protected readonly tag: number, bufferSrc: ArrayBuffer) {
    super(bufferSrc);
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(3 + this.buffer.byteLength);

    writer.writeUInt16LE(this.buffer.byteLength);
    writer.writeUInt8(this.tag);
    writer.writeBytes(this.buffer);

    return writer;
  }

  getTag(): number {
    return this.tag;
  }
}
