import { ClientSocket } from "../../..";
import { BinaryObject, BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { AlertPacket } from "../packets/alert";
import { ClientHello } from "../packets/handshake/clientHello";
import { CipherSuite } from "../types/cipherSuite";
import { ProtocolVersion } from "../types/protocolVersion";
import { ContentType, DtlsRecordReader } from "../types/dtlsRecord/reader";
import { HandshakeReader, HandshakeType } from "../types/handshake/reader";
import { Random } from "../types/random";
import { HazelDtlsSessionInfo } from "../types/hazelDtlsSessionInfo";
import { Extension } from "../types/extension/extension";
import { EllipticCurveExtensionData } from "../types/extension/ellipticCurveExtension";
import { HelloVerifyRequest } from "../packets/handshake/helloVerifyRequest";
//@ts-ignore
import arrayBufferEquals from "arraybuffer-equal";
import { ServerHello } from "../packets/handshake/serverHello";
import { X25519EcdheRsaSha256 } from "../types/x25519EcdheRsaSha256";
import { Certificate } from "../packets/handshake/certificate";
import * as forge from "node-forge";
import { ServerKeyExchange } from "../packets/handshake/serverKeyExchange";
import * as x25519 from "@stablelib/x25519";
import { DtlsRecordWriter, expandSecret } from "..";
import { Aes128GcmRecordProtection } from "./recordProtection";
import { ClientKeyExchange } from "../packets/handshake/clientKeyExchange";

enum HandshakeState {
  Established,
  ExpectingServerHello,
  ExpectingCertificate,
  ExpectingServerKeyExchange,
  ExpectingServerHelloDone,
  ExpectingChangeCipherSpec,
  Initializing
}

type EpochState = {
  epoch: number,
  state: HandshakeState,

  clientRandom: Random,
  serverRandom: Random,

  selectedCipherSuite: CipherSuite,
  cookie: ArrayBuffer,

  handshake?: X25519EcdheRsaSha256,
  verificationStream: ArrayBuffer[],
  serverCertificate?: forge.pki.Certificate

  recordProtection?: Aes128GcmRecordProtection,

  masterSecret: ArrayBuffer,
  serverVerification: ArrayBuffer,

  certificateFragments?: ArrayBuffer,
  certificateFragmentDataRecv: number,
  certificatePayload: ArrayBuffer,
}

export class DtlsSocket extends ClientSocket {
  protected packetHandlers: Map<BinaryObject<BinaryObjectInstance, []>, Set<(t: BinaryObjectInstance) => void>> = new Map();

  protected recieveMap: Map<number, Map<number, BinaryObjectInstance>> = new Map();

  protected protocolVersion = new ProtocolVersion(1, 2)
  protected epoch: number = 0;
  protected sequenceNumber: number = 1;

  protected epochState!: EpochState;

  protected handshakeSequence: number = 0;

  protected messagesBuffer: ArrayBuffer[] = [];

  protected recordProtection?: Aes128GcmRecordProtection;

  protected resolveEvent?: () => any;

  constructor(protected readonly socket: ClientSocket) {
    super();

    socket.addRecieveHandler(bin => {
      const reader = BinaryReader.from(bin);
      while (reader.hasBytesLeftToRead()) {
        this.handleMessage(reader.read(DtlsRecordReader));
      }
    });

    this.resetConnectionState();
  }

  protected resetConnectionState() {
    this.epochState = {
      epoch: 1,
      state: HandshakeState.Initializing,
      selectedCipherSuite: CipherSuite.TLS_NULL_WITH_NULL_NULL,
      cookie: new ArrayBuffer(0),
      verificationStream: [],
      serverRandom: Random.NULL,
      clientRandom: Random.generate(),
      masterSecret: new ArrayBuffer(0),
      serverVerification: new ArrayBuffer(0),
      certificateFragmentDataRecv: 0,
      certificatePayload: new ArrayBuffer(0),
    }
  }
  
  async close() {
    await this.socket.close();
  }

  send(binary: ArrayBuffer): void {
    const outgoingRecord = DtlsRecordReader.fromRecord(ContentType.ApplicationData, new ProtocolVersion(1, 2), this.epoch, this.sequenceNumber++, binary);
    const newRecord = this.epochState.recordProtection!.encryptClientPlaintext(outgoingRecord);

    this.socket.send(newRecord.serialize().getBuffer().buffer);
  }

  protected handleMessage(message: DtlsRecordReader): void {
    console.log("DTLS Record (" + ContentType[message.getContentType()] + ")")

    if (message.getContentType() === ContentType.Alert) {
      const alert = AlertPacket.deserialize(message);
      this.emitError(new Error(`DTLS Alert: ${alert.toString()}`));
      return;
    }

    if (message.getContentType() === ContentType.ChangeCipherSpec) {
      this.recordProtection = this.epochState.recordProtection;
      this.epoch = this.epochState.epoch;
      return;
    }

    if (message.getContentType() === ContentType.Handshake) {
      while (message.hasBytesLeftToRead()) {
        if (this.recordProtection) {
          const decrypted = this.recordProtection!.decryptCiphertextFromServer(message);
          this.handleHandshake(decrypted.read(HandshakeReader));
          message.readBytes(this.recordProtection!.getEncryptedSize(decrypted.getBuffer().byteLength));
          continue;
        }

        this.handleHandshake(message.read(HandshakeReader));
      }
      return;
    }

    if (message.getContentType() === ContentType.ApplicationData) {
      const decrypted = this.recordProtection!.decryptCiphertextFromServer(message);
      this.emitRecieve(decrypted.getBuffer().buffer);
    }
  }

  protected handleHandshake(message: HandshakeReader) {
    console.log("DTLS Handshake (" + HandshakeType[message.getHandshakeType()] + ")");

    this.handshakeSequence = message.getMessageSequence() + 1;

    switch(message.getHandshakeType()) {
      case HandshakeType.HelloVerifyRequest:
        return this.handleHelloVerifyRequest(HelloVerifyRequest.deserialize(message));
      case HandshakeType.ServerHello:
        this.epochState.verificationStream.push(message.serialize().getBuffer().buffer);
        return this.handleServerHello(ServerHello.deserialize(message));
      case HandshakeType.Certificate:
        if (message.getFullLength() == message.getBuffer().byteLength) {
          const writer = new HandshakeReader( // make better
            HandshakeType.Certificate,
            message.getMessageSequence(),
            0,
            message.getFullLength(),
            new ArrayBuffer(message.getFullLength())
          );
          const handshakeHeader = writer.serialize().getBuffer().buffer.slice(0, 12);
          this.epochState.verificationStream.push(handshakeHeader);
          this.epochState.verificationStream.push(message.getBuffer().buffer);
          this.handleCertificate(Certificate.deserialize(message));
        } else {
          if (!this.epochState.certificateFragments)
            this.epochState.certificateFragments = new ArrayBuffer(message.getFullLength());

          new Uint8Array(this.epochState.certificateFragments).set(new Uint8Array(message.getBuffer().buffer), message.getFragmentOffset());

          this.epochState.certificateFragmentDataRecv += message.getBuffer().byteLength;

          if (this.epochState.certificateFragmentDataRecv === message.getFullLength()) {
            const writer = new HandshakeReader( // make better
              HandshakeType.Certificate,
              message.getMessageSequence(),
              0,
              message.getFullLength(),
              new ArrayBuffer(message.getFullLength())
            );
            const handshakeHeader = writer.serialize().getBuffer().buffer.slice(0, 12);;
            this.epochState.verificationStream.push(handshakeHeader);
            this.epochState.verificationStream.push(this.epochState.certificateFragments);
            this.handleCertificate(Certificate.deserialize(BinaryReader.from(this.epochState.certificateFragments)));
            this.epochState.certificateFragments = undefined;
            this.epochState.certificateFragmentDataRecv = 0;
          }
        }
        break;
      case HandshakeType.ServerKeyExchange:
        this.epochState.verificationStream.push(message.serialize().getBuffer().buffer);
        return this.handleServerKeyExchange(ServerKeyExchange.deserialize(message));
      case HandshakeType.ServerHelloDone:
        this.epochState.verificationStream.push(message.serialize().getBuffer().buffer);
        return this.handleServerHelloDone();
      case HandshakeType.Finished:
        this.epochState.state = HandshakeState.Established;
        this.resolveEvent?.();
        return;
    }
  }

  protected handleServerHelloDone() {
    if (this.epochState.state !== HandshakeState.ExpectingServerHelloDone) {
      console.log("invalid state");
      return;
    }

    this.epochState.state = HandshakeState.ExpectingChangeCipherSpec;
    this.sendClientKeyExchangeFlight(false);
  }

  protected handleServerKeyExchange(keyExchange: ServerKeyExchange) {
    if (keyExchange.getCurveType() !== 0x03) { // ECCurveType.NamedCurve
      console.log("Unsupported curve type");
      return;
    }

    if (keyExchange.getSelectedCurve() !== 0x001d) { // NamedCurve.x25519
      console.log("Unsupported selected curve");
      return;
    }

    if (keyExchange.getHashAlgorithm() !== 0x04) { // HashAlgorithm.Sha256
      console.log("Unsupported hash algorithm");
      return;
    }

    if (keyExchange.getSignatureAlgorithm() !== 0x01) { // SignatureAlgorithm.RSA
      console.log("Unsupported signature algorithm");
      return;
    }

    if (this.epochState.serverCertificate === undefined) {
      console.log("state error: missing public key");
      return;
    }

    const keyAndParameters = keyExchange.serialize().getBuffer().buffer.slice(0, 4 + keyExchange.getKey().byteLength);

    const md = forge.md.sha256.create();

    md.update(forge.util.binary.raw.encode(new Uint8Array(keyAndParameters)), "raw");

    const signature = forge.util.binary.raw.encode(new Uint8Array(keyExchange.getSignature()));

    const result = (this.epochState.serverCertificate.publicKey as forge.pki.rsa.PublicKey).verify(md.digest().bytes(), signature, "RSASSA-PKCS1-V1_5");

    if (!result) {
      console.log("signature failure");
      return;
    }

    const res = x25519.scalarMult(
      new Uint8Array(this.epochState.clientRandom.serialize().getBuffer().buffer),
      new Uint8Array(keyExchange.getKey())
    );

    const randomSeed = BinaryWriter.allocate(64);
    randomSeed.write(this.epochState.clientRandom);
    randomSeed.write(this.epochState.serverRandom);

    const labelEncoder = new TextEncoder();
    
    // intentional typo due to typo in upstream https://github.com/willardf/Hazel-Networking/
    const masterSecret = expandSecret(res, labelEncoder.encode("master secert"), new Uint8Array(randomSeed.getBuffer().buffer), 48);

    if (this.epochState.selectedCipherSuite.equals(CipherSuite.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256)) {
      this.epochState.recordProtection = new Aes128GcmRecordProtection(
        masterSecret,
        this.epochState.serverRandom.serialize().getBuffer().buffer,
        this.epochState.clientRandom.serialize().getBuffer().buffer
      )
    } else {
      console.log("Unsupported cipher suite");
      return;
    }

    this.epochState.state = HandshakeState.ExpectingServerHelloDone;
    this.epochState.masterSecret = masterSecret;
  }

  protected handleCertificate(certificate: Certificate) {
    if (certificate.getCertificate().publicKey === undefined) {
      console.log("Dropping malfomed Certificate message: Certificate is not RSA signed");
      return;
    }

    this.epochState.serverCertificate = certificate.getCertificate();
    this.epochState.state = HandshakeState.ExpectingServerKeyExchange;
  }

  protected handleServerHello(hello: ServerHello) {
    if (this.epochState.state != HandshakeState.ExpectingServerHello) {
      console.log("Dropping unexpected ServerHello handshake message. State(" + HandshakeState[this.epochState.state] + ")");
      return;
    }

    if (hello.getCipherSuite().equals(CipherSuite.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256)) {
      this.epochState.handshake = new X25519EcdheRsaSha256();
    } else {
      console.log("Dropping malformed ServerHello message. Unsupported CiperSuite");
    }

    this.epochState.selectedCipherSuite = hello.getCipherSuite();
    this.epochState.state = HandshakeState.ExpectingCertificate;
    this.epochState.certificateFragments = undefined;
    this.epochState.certificateFragmentDataRecv = 0;
    this.epochState.serverRandom = hello.getRandom();
    this.epochState.certificatePayload = new ArrayBuffer(0);
  }

  protected handleHelloVerifyRequest(request: HelloVerifyRequest) {
    if (this.epochState.state != HandshakeState.ExpectingServerHello) {
      console.log("Dropping unexpected HelloVerifyRequest handshake message. State(" + HandshakeState[this.epochState.state] + ")");
      return;
    }

    if (arrayBufferEquals(this.epochState.cookie, request.getCookie())) {
      console.log("Dropping duplicate HelloVerifyRequest handshake message");
      return;
    }

    this.epochState.cookie = request.getCookie();

    this.sendClientHello();
  }

  protected incrementEpoch() { this.epoch++; this.sequenceNumber = 0 }

  protected sendDtlsMessage(type: ContentType, message: BinaryWriter | BinaryReader): void {
    const writer = DtlsRecordReader.fromRecord(type, this.protocolVersion, this.epoch, this.sequenceNumber++, message.getBuffer().buffer)

    this.messagesBuffer.push(writer.serialize().getBuffer().buffer);

    this.socket.send(writer.serialize().getBuffer().buffer);
  }

  protected sendHandshakeMessage(verifyStream: boolean, ...messages: (BinaryObjectInstance & { getType(): HandshakeType })[]): void {
    const writer = BinaryWriter.allocate(0);

    for (const message of messages) {
      const buf = message.serialize().getBuffer().buffer;

      const handshakeReader = HandshakeReader.fromHandshake(message.getType(), this.handshakeSequence++, 0, buf.byteLength, buf);

      writer.writeBytes(handshakeReader.serialize());
    }
    if (verifyStream) {
      this.epochState.verificationStream.push(writer.getBuffer().buffer);
    }

    this.sendDtlsMessage(ContentType.Handshake, writer);
  }

  protected addOncePacketHandler<T extends BinaryObject<BinaryObjectInstance, []>>(packetType: T, handler: (pkt: BinaryObjectInstance) => void) {
    if (!this.packetHandlers.has(packetType))
      this.packetHandlers.set(packetType, new Set());

    let selfHandler: (pkt: BinaryObjectInstance) => void;

    selfHandler = (pkt: BinaryObjectInstance) => {
      this.packetHandlers.get(packetType)?.delete(selfHandler);
      handler(pkt);
    }

    this.packetHandlers.get(packetType)!.add(selfHandler);
  }

  protected waitForHandshake<T extends BinaryObject<BinaryObjectInstance, []>>(packetType: T): Promise<T["prototype"]> {
    return new Promise((res, rej) => {
      this.addOncePacketHandler(packetType, pkt => {
        res(pkt);
      })
    })
  }

  protected clearMessagesBuffer() {
    this.messagesBuffer = [];
  }

  async connect(): Promise<void> {
    await this.socket.connect();

    await new Promise((res, rej) => {
      this._connect().then(res, rej);

      this.addErrorHandler(rej);
    })
  }

  protected sendClientKeyExchangeFlight(retransmitting: boolean) {
    const cke = new ClientKeyExchange(
      x25519.scalarMultBase(
        new Uint8Array(this.epochState.clientRandom.serialize().getBuffer().buffer)
      )
    )

    const buf = cke.serialize().getBuffer().buffer;

    const handshakeReader = HandshakeReader.fromHandshake(cke.getType(), this.handshakeSequence++, 0, buf.byteLength, buf);
    const cker = DtlsRecordReader.fromRecord(ContentType.Handshake, this.protocolVersion, this.epoch, this.sequenceNumber++, handshakeReader.serialize().getBuffer().buffer);
    const ccsr = DtlsRecordReader.fromRecord(ContentType.ChangeCipherSpec, this.protocolVersion, this.epoch, this.sequenceNumber++, new Uint8Array([1]).buffer);

    this.incrementEpoch();
    
    if (!retransmitting) {
      this.epochState.verificationStream.push(cker.getBuffer().buffer);
      handshakeReader.serialize().getBuffer().buffer
    }

    const bytes = new Uint8Array(this.epochState.verificationStream.reduce((a, b) => a + b.byteLength, 0));
    let offset = 0;

    for (const verif of this.epochState.verificationStream) {
      bytes.set(new Uint8Array(verif), offset);
      offset += verif.byteLength;
    }
    const handshakeHash = forge.md.sha256.create().update(forge.util.binary.raw.encode(bytes), "raw").digest();
    const labelEncoder = new TextEncoder();
    const serverVerif = expandSecret(this.epochState.masterSecret, labelEncoder.encode("server finished"), forge.util.binary.raw.decode(handshakeHash.bytes()), 42);
    const expandKeyOutput = expandSecret(this.epochState.masterSecret, labelEncoder.encode("client finished"), forge.util.binary.raw.decode(handshakeHash.bytes()), 12);

    const handshakeReader2 = HandshakeReader.fromHandshake(HandshakeType.Finished, this.handshakeSequence++, 0, expandKeyOutput.byteLength, expandKeyOutput);

    const fhr = this.epochState.recordProtection!.encryptClientPlaintext(
      DtlsRecordReader.fromRecord(ContentType.Handshake, this.protocolVersion, this.epoch, this.sequenceNumber++, handshakeReader2.serialize().getBuffer().buffer));

    const serializedCker = cker.serialize();
    const serializedCcsr = ccsr.serialize();
    const serializedFhr = fhr.serialize();

    const writer = BinaryWriter.allocate(serializedCcsr.getBuffer().byteLength + serializedCker.getBuffer().byteLength + serializedFhr.getBuffer().byteLength);

    writer.writeBytes(serializedCker);
    writer.writeBytes(serializedCcsr);
    writer.writeBytes(serializedFhr);

    this.socket.send(writer.getBuffer().buffer);
  }

  protected sendClientHello(retransmitting: boolean = false): void {
    this.epochState.verificationStream = [];
    this.handshakeSequence = 0;

    const clientHello = new ClientHello(
      this.protocolVersion,
      this.epochState.clientRandom,
      new HazelDtlsSessionInfo(1),
      this.epochState.cookie,
      [CipherSuite.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256],
      [0x00],
      [
        new Extension(10, new EllipticCurveExtensionData([0x001d]).serialize().getBuffer().buffer)
      ],
    );

    this.sendHandshakeMessage(true, clientHello);

    if (!retransmitting) {
      //TODO: VerificationStream

      this.epochState.state = HandshakeState.ExpectingServerHello
    }
  }

  protected async _connect(): Promise<void> {
    this.resetConnectionState();
    this.sendClientHello();

    await new Promise<void>(r => {
      this.resolveEvent = () => { r() };
    });
  }
}
