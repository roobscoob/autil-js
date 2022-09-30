import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { ProtocolVersion } from "../..";
import { CipherSuite } from "../../types/cipherSuite";
import { Extension } from "../../types/extension/extension";
import { HandshakeType } from "../../types/handshake/reader";
import { HazelDtlsSessionInfo } from "../../types/hazelDtlsSessionInfo";
import { Random } from "../../types/random";

export class ServerHello implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): ServerHello {
    const protocolVersion = reader.read(ProtocolVersion);
    const random = reader.read(Random);
    const session = reader.read(HazelDtlsSessionInfo);
    const cipherSuite = reader.read(CipherSuite);
    const compressionMethod = reader.readUInt8();

    return new ServerHello(protocolVersion, random, session, cipherSuite, compressionMethod);
  }

  constructor(
    protected readonly protocolVersion: ProtocolVersion,
    protected readonly random: Random,
    protected readonly session: HazelDtlsSessionInfo,
    protected readonly cipherSuite: CipherSuite,
    protected readonly compressionMethod: number,
  ) { }

  getType(): HandshakeType { return HandshakeType.ServerHello }

  getProtocolVersion() { return this.protocolVersion }
  getRandom() { return this.random }
  getSession() { return this.session }
  getCipherSuite() { return this.cipherSuite }
  getCompressionMethod() { return this.compressionMethod }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(39);

    writer.write(this.protocolVersion);
    writer.write(this.random);
    writer.write(this.session);
    writer.write(this.cipherSuite);
    writer.writeUInt8(this.compressionMethod);

    return writer;
  }
}
