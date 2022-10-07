import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageReader } from "../../types/message/reader";
import { BasePacket } from "./basePacket";
import { SendOption } from "./sendOption";

export class V1DisconnectPacket extends BasePacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    return new V1DisconnectPacket(reader.getRemainingBuffer());
  }

  constructor(protected readonly reason: ArrayBuffer) { super() }

  isDisconnect(): this is V1DisconnectPacket {
    return true;
  }

  getReason() { return this.reason }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(1 + this.reason.byteLength);

    writer.writeUInt8(SendOption.Disconnect);
    writer.writeBytes(this.reason);

    return writer;
  }
}
