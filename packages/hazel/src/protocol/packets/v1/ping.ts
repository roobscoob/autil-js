import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageReader } from "../../types/message/reader";

export class V1PingPacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    return new V1PingPacket(
      reader.readUInt16BE()
    );
  }

  constructor(protected readonly nonce: number) {}

  shouldAcknowledge(): true { return true }
  getNonce() { return this.nonce }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(2)
    writer.writeUInt16BE(this.nonce);
    return writer;
  }
}
