import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageReader } from "../../types/message/reader";

export class V1DisconnectPacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    const isForced = reader.readUInt8() === 1;
    let disconnectReason: MessageReader | undefined;

    if (isForced) {
      disconnectReason = reader.read(MessageReader);
    }

    return new V1DisconnectPacket(
      isForced,
      disconnectReason,
    );
  }

  constructor(protected readonly _isForced: boolean, protected readonly reason: MessageReader | undefined) {}

  shouldAcknowledge(): false { return false }

  isForced(): boolean { return this._isForced }
  getReason(): MessageReader | undefined { return this.reason }

  serialize(): BinaryWriter {
    const reason = this.getReason();
    const writer = BinaryWriter.allocate(reason ? reason.getBuffer().byteLength + 4 : 1);

    writer.writeBoolean(this.isForced());

    if (reason) writer.write(reason);

    return writer;
  }
}
