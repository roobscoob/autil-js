import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { ProtocolVersion } from "../protocolVersion";

export enum ContentType {
  ChangeCipherSpec = 20,
  Alert,
  Handshake,
  ApplicationData,
}

export class DtlsRecordReader extends BinaryReader implements BinaryObjectInstance {
  static fromRecord(type: ContentType, protocolVersion: ProtocolVersion, epoch: number, sequenceNumber: number, data: ArrayBuffer) {
    return new DtlsRecordReader(type, protocolVersion, epoch, sequenceNumber, data);
  }

  static deserialize(reader: BinaryReader): DtlsRecordReader {
    const contentType = reader.readUInt8();
    const protocolVersion = reader.read(ProtocolVersion);
    const epoch = reader.readUInt16BE();
    const sequenceNumber = reader.readUInt48BE();
    const length = reader.readUInt16BE();
    const data = reader.readBytes(length).getBuffer().buffer;

    return new DtlsRecordReader(
      contentType,
      protocolVersion,
      epoch,
      sequenceNumber,
      data
    );
  }

  protected constructor(
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
