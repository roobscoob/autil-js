import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export enum HandshakeType {
  HelloRequest = 0,
  ClientHello,
  ServerHello,
  HelloVerifyRequest,
  Certificate = 11,
  ServerKeyExchange,
  CertificateRequest,
  ServerHelloDone,
  CertificateVerify,
  ClientKeyExchange,
  Finished = 20,
}

export class HandshakeReader extends BinaryReader implements BinaryObjectInstance {
  static fromHandshake(type: HandshakeType, messageSequence: number, fragmentOffset: number, fullLength: number, data: ArrayBuffer) {
    return new HandshakeReader(type, messageSequence, fragmentOffset, fullLength, data);
  }

  static deserialize(reader: BinaryReader) {
    const handshakeType = reader.readUInt8();
    const length = reader.readUInt24BE();
    const messageSequence = reader.readUInt16BE();
    const fragmentOffset = reader.readUInt24BE();
    const fragmentLength = reader.readUInt24BE();

    const data = reader.readBytes(fragmentLength).getBuffer().buffer;

    return new HandshakeReader(handshakeType, messageSequence, fragmentOffset, length, data);
  }

  constructor(protected readonly handshakeType: HandshakeType, protected readonly messageSequence: number, protected readonly fragmentOffset: number, protected readonly fullLength: number, data: ArrayBuffer) {
    super(data);
  }

  getHandshakeType(): HandshakeType {
    return this.handshakeType;
  }

  getMessageSequence() {
    return this.messageSequence;
  }

  getFragmentOffset() {
    return this.fragmentOffset;
  }

  getFullLength() {
    return this.fullLength;
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(12 + this.buffer.byteLength);

    writer.writeUInt8(this.handshakeType);
    writer.writeUInt24BE(this.getFullLength());
    writer.writeUInt16BE(this.getMessageSequence());
    writer.writeUInt24BE(this.getFragmentOffset());
    writer.writeUInt24BE(this.buffer.byteLength);
    writer.writeBytes(this.buffer);

    return writer;
  }
}
