import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { Endianness } from "../../../types/endianness";
import { Bitfield } from "../../types/bitfield";
import { MessageReader } from "../../types/message/reader";
import { BasePacket } from "./basePacket";
import { SendOption } from "./sendOption";

export class V1AcknowledgementPacket extends BasePacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    return new V1AcknowledgementPacket(
      reader.readUInt16BE(),
      reader.read(Bitfield, 1, Endianness.LittleEndian)
    );
  }

  constructor(protected readonly nonce: number, protected readonly ackHistory: Bitfield) { super() }

  isAcknowledgement(): this is V1AcknowledgementPacket {
    return true;
  }

  getNonce() { return this.nonce }
  getAcknowledgementHistory() { return this.ackHistory }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(4);

    writer.writeUInt8(SendOption.Acknowledgement);
    writer.writeUInt16BE(this.nonce);
    writer.write(this.ackHistory);

    return writer;
  }
}
