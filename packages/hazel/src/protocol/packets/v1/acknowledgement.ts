import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { Endianness } from "../../../types/endianness";
import { Bitfield } from "../../types/bitfield";
import { MessageReader } from "../../types/message/reader";

export class V1AcknowledgementPacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    return new V1AcknowledgementPacket(
      reader.readUInt16BE(),
      reader.read(Bitfield, 1, Endianness.LittleEndian)
    );
  }

  constructor(protected readonly nonce: number, protected readonly ackHistory: Bitfield) { }

  shouldAcknowledge(): false { return false }

  getNonce() { return this.nonce }
  getAcknowledgementHistory() { return this.ackHistory }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(3);

    writer.writeUInt16BE(this.nonce);
    writer.write(this.ackHistory);

    return writer;
  }
}
