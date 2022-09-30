import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { ProtocolVersion } from "../..";
import { CipherSuite } from "../../types/cipherSuite";
import { Extension } from "../../types/extension/extension";
import { HandshakeType } from "../../types/handshake/reader";
import { HazelDtlsSessionInfo } from "../../types/hazelDtlsSessionInfo";
import { Random } from "../../types/random";
import * as forge from "node-forge"
import * as b64 from "base64-js";

export class Certificate implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): Certificate {
    const totalSize = reader.readUInt24BE();
    const certificateSize = reader.readUInt24BE();

    const binary = reader.readBytes(certificateSize).getBuffer().buffer;

    const cert = forge.pki.certificateFromPem(`-----BEGIN CERTIFICATE-----\n${b64.fromByteArray(new Uint8Array(binary))}\n-----END CERTIFICATE-----`)

    return new Certificate(cert);
  }

  constructor(
    protected readonly binary: forge.pki.Certificate
  ) { }

  getCertificate() { return this.binary }

  getType(): HandshakeType { return HandshakeType.ClientHello }

  serialize(): BinaryWriter {
    const txt = forge.pki.certificateToPem(this.getCertificate());

    const binary = b64.toByteArray(txt.split("-----BEGIN CERTIFICATE-----\n")[1].split("\n-----END CERTIFICATE-----")[0].split("\n").join(""))

    const writer = BinaryWriter.allocate(6 + binary.byteLength);

    writer.writeUInt24BE(binary.byteLength + 3);
    writer.writeUInt24BE(binary.byteLength);

    return writer;
  }
}
