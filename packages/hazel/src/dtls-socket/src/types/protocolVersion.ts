import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export class ProtocolVersion implements BinaryObjectInstance {
  // 0x0000 version because forte wanted to "obfuscate DTLS as regular UDP packets" to make my life harder
  static Obfuscated = new ProtocolVersion(-1, -1);

  static deserialize(reader: BinaryReader): ProtocolVersion {
    return new ProtocolVersion(
      ~reader.readUInt8(),
      ~reader.readUInt8(),
    );
  }

  constructor(protected readonly major: number, protected readonly minor: number) {}

  getMajor() { return this.major }
  getMinor() { return this.minor }

  toString() { return `${this.getMajor()}.${this.getMinor()}` }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(2);

    writer.writeUInt8(~this.getMajor());
    writer.writeUInt8(~this.getMinor());

    return writer;
  }
}
