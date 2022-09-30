import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageReader } from "../../types/message/reader";

export class V1ReliablePacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    return new V1ReliablePacket(
      reader.readUInt16BE(),
      [...reader.readRemaining(r => r.read(MessageReader))]
    );
  }

  constructor(protected readonly nonce: number, protected readonly content: (MessageReader)[]) {}

  shouldAcknowledge(): true { return true }

  getContent() { return this.content }
  getNonce() { return this.nonce }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(2 + this.content.reduce((p, c) => p + c.getBuffer().byteLength + 3, 0));

    writer.writeUInt16BE(this.nonce);

    for (const message of this.content)
      writer.write(message);

    return writer;
  }
}
