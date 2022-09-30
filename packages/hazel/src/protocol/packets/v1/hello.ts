import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageReader } from "../../types/message/reader";

export class V1HelloPacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    return new V1HelloPacket(
      reader.readUInt16BE(),
      reader.readUInt8(),
      reader.readSInt32LE(),
      reader.readString(reader.readPackedUInt32()),
    );
  }

  constructor(
    protected readonly nonce: number,
    protected readonly hazelVersion: number,
    protected readonly clientVersion: number,
    protected readonly username: string
  ) {}

  shouldAcknowledge(): true { return true }

  getNonce() { return this.nonce }
  getHazelVersion() { return this.hazelVersion }
  getClientVersion() { return this.clientVersion }
  getUsername() { return this.username }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(20);

    writer.writeUInt16BE(this.nonce);
    writer.writeUInt8(this.hazelVersion);
    writer.writeSInt32LE(this.clientVersion);
    writer.writePackedUInt32(this.username.length);
    writer.writeString(this.username);

    return writer;
  }
}
