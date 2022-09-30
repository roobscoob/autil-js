import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { ProtocolVersion } from "../..";
import { CipherSuite } from "../../types/cipherSuite";
import { Extension } from "../../types/extension/extension";
import { HandshakeType } from "../../types/handshake/reader";
import { HazelDtlsSessionInfo } from "../../types/hazelDtlsSessionInfo";
import { Random } from "../../types/random";

export class HelloVerifyRequest implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): HelloVerifyRequest {
    const protocolVersion = reader.read(ProtocolVersion);
    const cookieSize = reader.readUInt8();
    const cookie = reader.readBytes(cookieSize).getBuffer().buffer;

    return new HelloVerifyRequest(protocolVersion, cookie);
  }

  constructor(
    protected readonly protocolVersion: ProtocolVersion,
    protected readonly cookie: ArrayBuffer
  ) { }

  getType(): HandshakeType { return HandshakeType.HelloVerifyRequest }

  getProtocolVersion() { return this.protocolVersion }
  getCookie() { return this.cookie }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(39);

    writer.write(this.protocolVersion);
    writer.writeUInt8(this.cookie.byteLength);
    writer.writeBytes(this.cookie);

    return writer;
  }
}
