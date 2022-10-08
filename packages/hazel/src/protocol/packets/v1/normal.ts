import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageWriter } from "../..";
import { MessageReader } from "../../types/message/reader";
import { BasePacket } from "./basePacket";
import { SendOption } from "./sendOption";

export class V1NormalPacket extends BasePacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    return new V1NormalPacket([...reader.readRemaining(r => r.read(MessageReader))]);
  }

  constructor(protected readonly content: (MessageReader | MessageWriter)[]) { super() }

  isNormal(): this is V1NormalPacket {
    return true;
  }

  getContent() { return this.content }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(1 + this.content.reduce((p, c) => p + c.serialize().getBuffer().byteLength + 3, 0));

    writer.writeUInt8(SendOption.Normal);

    for (const message of this.content)
      writer.write(message);

    return writer;
  }
}
