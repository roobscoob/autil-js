import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { ProtocolVersion } from "../..";
import { CipherSuite } from "../../types/cipherSuite";
import { Extension } from "../../types/extension/extension";
import { HandshakeType } from "../../types/handshake/reader";
import { HazelDtlsSessionInfo } from "../../types/hazelDtlsSessionInfo";
import { Random } from "../../types/random";

const X25519KEY_SIZE = 32

export class ClientKeyExchange implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): ClientKeyExchange {
    const size = reader.readUInt8();
    const data = reader.readBytes(size);

    return new ClientKeyExchange(data.getBuffer().buffer);
  }

  constructor(
    protected readonly data: ArrayBuffer,
  ) { }

  getType(): HandshakeType { return HandshakeType.ClientKeyExchange }

  getData() { return this.data }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(this.getData().byteLength + 1);

    writer.writeUInt8(this.getData().byteLength);
    writer.writeBytes(this.getData());

    return writer;
  }
}
