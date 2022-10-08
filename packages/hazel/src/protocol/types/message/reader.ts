import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export class MessageReader extends BinaryReader implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): MessageReader {
    const length = reader.readUInt16LE();

    return new MessageReader(
      reader.readUInt8(),
      reader.readBytes(length).getBuffer().buffer,
    );
  }

  static from(buffer: Buffer | DataView | ArrayBuffer): MessageReader {
    if (buffer instanceof ArrayBuffer)
      return new MessageReader(0, buffer);

    return this.from(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
  }

  static fromTagged(tag: number, buffer: Buffer | DataView | ArrayBuffer): MessageReader {
    if (buffer instanceof ArrayBuffer)
      return new MessageReader(tag, buffer);

    return this.fromTagged(tag, buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
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

  clone(): MessageReader {
    return MessageReader.fromTagged(this.getTag(), this.buffer);
  }
}
