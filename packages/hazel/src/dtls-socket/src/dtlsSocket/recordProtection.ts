import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { DtlsRecordReader, DtlsRecordWriter, expandSecret } from "../index";
import { Aes128Gcm } from "./aes128gcm";

export class Aes128GcmRecordProtection {
  protected readonly clientWriteIv: ArrayBuffer;
  protected readonly serverWriteIv: ArrayBuffer;

  protected readonly clientWriteCipher: Aes128Gcm;
  protected readonly serverWriteCipher: Aes128Gcm;

  constructor(
    masterSecret: ArrayBuffer,
    serverRandom: ArrayBuffer,
    clientRandom: ArrayBuffer,
  ) {
    const combinedRandom = BinaryWriter.allocate(64);
    combinedRandom.writeBytes(serverRandom);
    combinedRandom.writeBytes(clientRandom);

    const labelEncoder = new TextEncoder();
    const expandedKey = BinaryReader.from(expandSecret(masterSecret, labelEncoder.encode("key expansion"), combinedRandom.getBuffer().buffer, 42));

    const clientWriteKey = expandedKey.readBytes(16).getBuffer().buffer;
    const serverWriteKey = expandedKey.readBytes(16).getBuffer().buffer;

    this.clientWriteIv = expandedKey.readBytes(4).getBuffer().buffer;
    this.serverWriteIv = expandedKey.readBytes(4).getBuffer().buffer;

    console.log("Master secret", Buffer.from(masterSecret).toString("hex"));
    console.log("Server random", Buffer.from(serverRandom).toString("hex"));
    console.log("Client random", Buffer.from(clientRandom).toString("hex"));
    console.log("Expanded key", Buffer.from(expandedKey.getBuffer().buffer).toString("hex"));

    this.clientWriteCipher = new Aes128Gcm(clientWriteKey);
    this.serverWriteCipher = new Aes128Gcm(serverWriteKey);
  }

  encryptServerPlaintext(input: DtlsRecordReader | DtlsRecordWriter) {
    return this.encryptPlaintext(input, this.serverWriteCipher, this.serverWriteIv);
  }

  encryptClientPlaintext(input: DtlsRecordReader | DtlsRecordWriter) {
    return this.encryptPlaintext(input, this.clientWriteCipher, this.clientWriteIv);
  }

  encryptPlaintext(input: DtlsRecordReader | DtlsRecordWriter, cipher: Aes128Gcm, writeIv: ArrayBuffer): DtlsRecordWriter {
    const nonce = BinaryWriter.allocate(12);
    nonce.writeBytes(writeIv);
    nonce.writeUInt16BE(input.getEpoch());
    nonce.writeUInt48BE(input.getSequenceNumber());

    const associatedData = input.serialize();

    console.log(Buffer.from(nonce.getBuffer().buffer).toString("hex"), Buffer.from(input.getBuffer().buffer).toString("hex"), Buffer.from(associatedData.getBuffer().buffer.slice(0, 13)).toString("hex"));

    const result = cipher.seal(nonce.getBuffer().buffer, input.getBuffer().buffer, associatedData.getBuffer().buffer.slice(0, 13));

    const writer = DtlsRecordWriter.allocateRecord(
      input.getContentType(),
      input.getProtocolVersion(),
      input.getEpoch(),
      input.getSequenceNumber(),
      result.byteLength,
    );

    writer.writeBytes(result);

    return writer;
  }

  decryptCiphertextFromServer(input: DtlsRecordReader | DtlsRecordWriter) {
    return this.decryptCiphertext(input, this.serverWriteCipher, this.serverWriteIv);
  }

  decryptCiphertextFromClient(input: DtlsRecordReader | DtlsRecordWriter) {
    return this.decryptCiphertext(input, this.clientWriteCipher, this.clientWriteIv);
  }

  decryptCiphertext(input: DtlsRecordReader | DtlsRecordWriter, cipher: Aes128Gcm, writeIv: ArrayBuffer): DtlsRecordWriter {
    const nonce = BinaryWriter.allocate(8);
    nonce.writeBytes(writeIv);
    nonce.writeUInt16BE(input.getEpoch());
    nonce.writeUInt48BE(input.getSequenceNumber());

    const associatedData = input.serialize();

    const result = cipher.open(nonce.getBuffer().buffer, input.getBuffer().buffer, associatedData.getBuffer().buffer);

    const writer = DtlsRecordWriter.allocateRecord(
      input.getContentType(),
      input.getProtocolVersion(),
      input.getEpoch(),
      input.getSequenceNumber(),
      result.byteLength
    );

    writer.writeBytes(result);

    return writer;
  }
}
