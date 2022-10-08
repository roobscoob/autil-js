import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageWriter } from "../..";
import { MessageReader } from "../../types/message/reader";
import { BasePacket, ReliableLikePacket } from "./basePacket";
import { SendOption } from "./sendOption";

export class V1ReliablePacket extends BasePacket implements BinaryObjectInstance, ReliableLikePacket {
  static deserialize(reader: BinaryReader) {
    return new V1ReliablePacket(
      reader.readUInt16BE(),
      [...reader.readRemaining(r => r.read(MessageReader))]
    );
  }

  constructor(protected readonly nonce: number, protected readonly content: (MessageReader | MessageWriter)[]) { super() }

  isReliable(): this is V1ReliablePacket {
    return true;
  }

  shouldAcknowledge(): this is ReliableLikePacket { return true }

  getContent() { return this.content }
  getNonce() { return this.nonce }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(3 + this.content.reduce((p, c) => p + c.getBuffer().byteLength + 3, 0));

    writer.writeUInt8(SendOption.Reliable);
    writer.writeUInt16BE(this.nonce);

    for (const message of this.content)
      writer.write(message);

    return writer;
  }
}
