import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { ProtocolVersion } from "../..";
import { CipherSuite } from "../../types/cipherSuite";
import { Extension } from "../../types/extension/extension";
import { HandshakeType } from "../../types/handshake/reader";
import { HazelDtlsSessionInfo } from "../../types/hazelDtlsSessionInfo";
import { Random } from "../../types/random";

const X25519KEY_SIZE = 32

export class ServerKeyExchange implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): ServerKeyExchange {
    const curveType = reader.readUInt8();
    const selectedCurve = reader.readUInt16BE();
    const size = reader.readUInt8();
    const key = reader.readBytes(size);
    const hashAlgorithm = reader.readUInt8();
    const signatureAlgorithm = reader.readUInt8();
    const signatureSize = reader.readUInt16BE();
    const signature = reader.readBytes(signatureSize);

    return new ServerKeyExchange(
      curveType,
      selectedCurve,
      key.getBuffer().buffer,
      hashAlgorithm,
      signatureAlgorithm,
      signature.getBuffer().buffer,
    );
  }

  constructor(
    protected readonly curveType: number,
    protected readonly selectedCurve: number,
    protected readonly key: ArrayBuffer,
    protected readonly hashAlgorithm: number,
    protected readonly signatureAlgorithm: number,
    protected readonly signature: ArrayBuffer,
  ) { }

  getType(): HandshakeType { return HandshakeType.ServerKeyExchange }

  getCurveType() { return this.curveType }
  getSelectedCurve() { return this.selectedCurve }
  getKey() { return this.key }
  getHashAlgorithm() { return this.hashAlgorithm }
  getSignatureAlgorithm() { return this.signatureAlgorithm }
  getSignature() { return this.signature }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(this.getKey().byteLength + 6);

    writer.writeUInt8(this.getCurveType());
    writer.writeUInt16BE(this.getSelectedCurve())
    writer.writeUInt8(this.getKey().byteLength);
    writer.writeBytes(this.getKey());
    writer.writeUInt8(this.getHashAlgorithm());
    writer.writeUInt8(this.getSignatureAlgorithm());

    return writer;
  }
}
