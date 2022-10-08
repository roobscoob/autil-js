import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageReader } from "../../types/message/reader";
import type { V1AcknowledgementPacket } from "./acknowledgement";
import { BasePacket, ReliableLikePacket } from "./basePacket";
import type { V1DisconnectPacket } from "./disconnect";
import type { V1NormalPacket } from "./normal";
import type { V1PingPacket } from "./ping";
import type { V1ReliablePacket } from "./reliable";
import { SendOption } from "./sendOption";

export class V1HelloPacket extends BinaryReader implements BinaryObjectInstance, BasePacket, ReliableLikePacket {
  static deserialize(reader: BinaryReader) {
    return new V1HelloPacket(
      reader.readUInt16BE(),
      reader.readUInt8(),
      reader.getRemainingBuffer(),
    );
  }

  constructor(
    protected readonly nonce: number,
    protected readonly hazelVersion: number,
    protected readonly data: ArrayBuffer
  ) {
    super(data);
  }

  isHello(): this is V1HelloPacket {
    return true;
  }

  isAcknowledgement(): this is V1AcknowledgementPacket {
    return false;
  }

  isDisconnect(): this is V1DisconnectPacket {
    return false;
  }

  isNormal(): this is V1NormalPacket {
    return false;
  }

  isPing(): this is V1PingPacket {
    return false;
  }

  isReliable(): this is V1ReliablePacket {
    return false;
  }

  shouldAcknowledge(): this is ReliableLikePacket { return true }

  getNonce() { return this.nonce }
  getHazelVersion() { return this.hazelVersion }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(4 + this.getBuffer().byteLength);

    writer.writeUInt8(SendOption.Hello)
    writer.writeUInt16BE(this.nonce);
    writer.writeUInt8(this.hazelVersion);
    writer.writeBytes(this.getBuffer());

    return writer;
  }
}
