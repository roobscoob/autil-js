import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { ProtocolVersion } from "../protocolVersion";
import { ContentType } from "."

export class DtlsRecordWriter extends BinaryWriter implements BinaryObjectInstance {
  static allocateRecord(type: ContentType, version: ProtocolVersion, epoch: number, sequenceNumber: number, length: number) {
    return new DtlsRecordWriter(
      type,
      version,
      epoch,
      sequenceNumber,
      new ArrayBuffer(length),
    )
  }

  static deserialize(reader: BinaryReader): DtlsRecordWriter {
    const contentType = reader.readUInt8();
    const protocolVersion = reader.read(ProtocolVersion);
    const epoch = reader.readUInt16BE();
    const sequenceNumber = reader.readUInt48BE();
    const length = reader.readUInt16BE();
    const data = reader.readBytes(length).getBuffer().buffer;

    return new DtlsRecordWriter(
      contentType,
      protocolVersion,
      epoch,
      sequenceNumber,
      data
    );
  }

  constructor(
    protected readonly contentType: ContentType,
    protected readonly protocolVersion: ProtocolVersion,
    protected readonly epoch: number,
    protected readonly sequenceNumber: number,
    protected readonly data: ArrayBuffer,
  ) {
    super(data);
  }

  getContentType() { return this.contentType }
  getProtocolVersion() { return this.protocolVersion }
  getEpoch() { return this.epoch }
  getSequenceNumber() { return this.sequenceNumber }
  getData() { return this.data }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(this.data.byteLength + 13);

    writer.writeUInt8(this.contentType);
    writer.write(this.protocolVersion);
    writer.writeUInt16BE(this.epoch);
    writer.writeUInt48BE(this.sequenceNumber);
    writer.writeUInt16BE(this.data.byteLength);
    writer.writeBytes(this.data);

    return writer;
  }
}
