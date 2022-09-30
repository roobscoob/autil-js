import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageReader } from "../../types/message/reader";

export class V1NormalPacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    return new V1NormalPacket([...reader.readRemaining(r => r.read(MessageReader))]);
  }

  constructor(protected readonly content: (MessageReader)[]) {}

  shouldAcknowledge(): false { return false }

  getContent() { return this.content }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(this.content.reduce((p, c) => p + c.getBuffer().byteLength + 3, 0));

    for (const message of this.content)
      writer.write(message);

    return writer;
  }
}
