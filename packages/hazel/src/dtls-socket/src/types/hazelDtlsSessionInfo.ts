import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export class HazelDtlsSessionInfo implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): HazelDtlsSessionInfo {
    const size = reader.readUInt8();

    return new HazelDtlsSessionInfo(size === 0 ? 0 : reader.readUInt8());
  }

  protected readonly payloadSize: number;

  constructor(protected readonly version: number) {
    switch(version) {
      case 0: this.payloadSize = 0; break;
      case 1: this.payloadSize = 1; break;
      default:
        throw new Error("Unimplemented Hazel session version");
    }
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(2);

    writer.writeUInt8(this.payloadSize);

    if (this.version > 0) {
      writer.writeUInt8(this.version);
    }

    return writer;
  }
}
