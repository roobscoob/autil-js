import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export enum ExtensionType {
  SignatureAlgorithms = 13,
}

export class Extension implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): Extension {
    const type = reader.readUInt16BE();
    const size = reader.readUInt16BE();
    const data = reader.readBytes(size).getBuffer().buffer;

    return new Extension(type, data);
  }

  constructor(protected readonly type: ExtensionType, protected readonly data: ArrayBuffer) {}

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(4 + this.data.byteLength);

    writer.writeUInt16BE(this.type);
    writer.writeUInt16BE(this.data.byteLength);
    writer.writeBytes(this.data);

    return writer;
  }
}
