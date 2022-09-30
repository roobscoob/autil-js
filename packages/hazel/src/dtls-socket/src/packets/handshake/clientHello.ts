import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { ProtocolVersion } from "../..";
import { CipherSuite } from "../../types/cipherSuite";
import { Extension } from "../../types/extension/extension";
import { HandshakeType } from "../../types/handshake/reader";
import { HazelDtlsSessionInfo } from "../../types/hazelDtlsSessionInfo";
import { Random } from "../../types/random";

export class ClientHello implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader): ClientHello {
    const clientVersion = reader.read(ProtocolVersion);
    const random = reader.read(Random);
    const session = reader.read(HazelDtlsSessionInfo);
    const cookie = reader.readBytes(reader.readUInt8());
    const cipherSuitesLength = reader.readUInt16BE();
    const cipherSuitesReader = reader.readBytes(cipherSuitesLength);
    const cipherSuites: CipherSuite[] = [];

    while (cipherSuitesReader.hasBytesLeftToRead()) {
      cipherSuites.push(cipherSuitesReader.read(CipherSuite));
    }

    const compressionMethodsLength = reader.readUInt8();
    const compressionMethods: number[] = [];
    let compressionMethodsIncludesNull = false;

    for (let i = 0; i < compressionMethodsLength; i++) {
      const compressionMethod = reader.readUInt8()
      compressionMethods.push(compressionMethod);

      // CompressionMethod.Null is 0x00
      if (compressionMethod === 0x00)
        compressionMethodsIncludesNull = true;
    }

    if (!compressionMethodsIncludesNull)
      throw new Error("No NULL compression method offered");

    let extensions: Extension[] = [];

    //useless??
    const extensionsSize = reader.readUInt16BE();

    while (reader.hasBytesLeftToRead()) {
      extensions.push(reader.read(Extension));
    }

    return new ClientHello(
      clientVersion,
      random,
      session,
      cookie.getBuffer().buffer,
      cipherSuites,
      compressionMethods,
      extensions,
    )
  }

  constructor(
    protected readonly clientVersion: ProtocolVersion,
    protected readonly random: Random,
    protected readonly session: HazelDtlsSessionInfo,
    protected readonly cookie: ArrayBuffer,
    protected readonly cipherSuites: CipherSuite[],
    protected readonly compressionMethods: number[],
    protected readonly extensions: Extension[],
  ) {}

  getType(): HandshakeType { return HandshakeType.ClientHello }

  getClientVersion() { return this.clientVersion }
  getRandom() { return this.random }
  getSession() { return this.session }
  getCookie() { return this.cookie }
  getCipherSuites() { return this.cipherSuites }
  getCompressionMethods() { return this.compressionMethods }
  getExtensions() { return this.extensions }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(2 + 32 + 32 + 2 + 128 + 1 + 128);

    writer.write(this.clientVersion);
    writer.write(this.random);
    writer.write(this.session);
    writer.writeUInt8(this.cookie.byteLength);
    writer.writeBytes(this.cookie);
    writer.writeUInt16BE(this.cipherSuites.length * 2);

    for (const cipherSuite of this.cipherSuites) {
      writer.write(cipherSuite);
    }

    writer.writeUInt8(this.compressionMethods.length);

    for (const compressionMethod of this.compressionMethods) {
      writer.writeUInt8(compressionMethod);
    }

    const extensionWriter = BinaryWriter.allocate(2);

    for (const extension of this.extensions) {
      extensionWriter.write(extension);
    }

    writer.writeUInt16BE(extensionWriter.getBuffer().byteLength);
    writer.writeBytes(extensionWriter.getBuffer());

    return writer;
  }
}
