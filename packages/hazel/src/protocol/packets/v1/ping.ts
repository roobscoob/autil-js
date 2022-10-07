import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageReader } from "../../types/message/reader";
import { BasePacket, ReliableLikePacket } from "./basePacket";
import { SendOption } from "./sendOption";

export class V1PingPacket extends BasePacket implements BinaryObjectInstance, ReliableLikePacket {
  static deserialize(reader: BinaryReader) {
    return new V1PingPacket(
      reader.readUInt16BE()
    );
  }

  constructor(protected readonly nonce: number) { super() }

  isPing(): this is V1PingPacket {
    return true;
  }

  shouldAcknowledge(): this is ReliableLikePacket { return true }
  getNonce() { return this.nonce }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(3);

    writer.writeUInt8(SendOption.Ping);
    writer.writeUInt16BE(this.nonce);

    return writer;
  }
}
