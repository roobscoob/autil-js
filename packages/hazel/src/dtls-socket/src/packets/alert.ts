import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export enum AlertLevel {
  Warning = 1,
  Fatal,
}

export enum AlertDescription {
  CloseNotify = 0,
  UnexpectedMessage = 10,
  BadRecordMac = 20,
  DecryptionFailedReserved,
  RecordOverflow,
  DecompressionFailure = 30,
  HandshakeFailure = 40,
  NoCertificateReserved,
  BadCertificate,
  UnsupportedCertificate,
  CertificateRevoked,
  CertificateExpired,
  CertificateUnknown,
  IllegalParameter,
  UnknownCertificateAuthority,
  AccessDenied,
  DecodeError,
  DecryptError,
  ExportRestrictionReserved = 60,
  ProtocolVersion = 70,
  InsufficientSecurity,
  InternalError = 80,
  UserCanceled = 90,
  NoRenegotation = 100,
  UnsupportedExtension = 110,
}

export const ALERT_DESCRIPTION_STR_EN: Record<AlertDescription, string> = {
  [AlertDescription.CloseNotify]: "This message notifies the recipient that the sender will not send any more messages on this connection. Note that as of TLS 1.1 failure to properly close a connection no longer requires that a session not be resumed. This is a change from TLS 1.0 to conform with widespread implementation practice.",
  [AlertDescription.UnexpectedMessage]: "An inappropriate message was received. This alert is always fatal and should never be observed in communication between proper implementations.",
  [AlertDescription.BadRecordMac]: "This alert is returned if a record is received with an incorrect MAC. This alert also MUST be returned if an alert is sent because a TLSCiphertext decrypted in an invalid way: either it wasn't an even multiple of the block length, or its padding values, when checked, weren't correct. This message is always fatal and should never be observed in communication between proper implementations (except when messages were corrupted in the network).",
  [AlertDescription.DecryptionFailedReserved]: "This alert was used in some earlier versions of TLS, and may have permitted certain attacks against the CBC mode [CBCATT]. It MUST NOT be sent by compliant implementations.",
  [AlertDescription.RecordOverflow]: "A TLSCiphertext record was received that had a length more than 2^14+2048 bytes, or a record decrypted to a TLSCompressed record with more than 2^14+1024 bytes. This message is always fatal and should never be observed in communication between proper implementations (except when messages were corrupted in the network).",
  [AlertDescription.DecompressionFailure]: "The decompression function received improper input (e.g., data that would expand to excessive length). This message is always fatal and should never be observed in communication between proper implementations.",
  [AlertDescription.HandshakeFailure]: "Reception of a handshake_failure alert message indicates that the sender was unable to negotiate an acceptable set of security parameters given the options available. This is a fatal error.",
  [AlertDescription.NoCertificateReserved]: "This alert was used in SSLv3 but not any version of TLS. It MUST NOT be sent by compliant implementations.",
  [AlertDescription.BadCertificate]: "A certificate was corrupt, contained signatures that did not verify correctly, etc.",
  [AlertDescription.UnsupportedCertificate]: "A certificate was of an unsupported type.",
  [AlertDescription.CertificateRevoked]: "A certificate was revoked by its signer.",
  [AlertDescription.CertificateExpired]: "A certificate has expired or is not currently valid.",
  [AlertDescription.CertificateUnknown]: "Some other (unspecified) issue arose in processing the certificate, rendering it unacceptable.",
  [AlertDescription.IllegalParameter]: "A field in the handshake was out of range or inconsistent with other fields. This message is always fatal.",
  [AlertDescription.UnknownCertificateAuthority]: "A valid certificate chain or partial chain was received, but the certificate was not accepted because the CA certificate could not be located or couldn't be matched with a known, trusted CA. This message is always fatal.",
  [AlertDescription.AccessDenied]: "A valid certificate was received, but when access control was applied, the sender decided not to proceed with negotiation. This message is always fatal.",
  [AlertDescription.DecodeError]: "A message could not be decoded because some field was out of the specified range or the length of the message was incorrect. This message is always fatal and should never be observed in communication between proper implementations (except when messages were corrupted in the network).",
  [AlertDescription.DecryptError]: "A handshake cryptographic operation failed, including being unable to correctly verify a signature or validate a Finished message. This message is always fatal.",
  [AlertDescription.ExportRestrictionReserved]: "This alert was used in some earlier versions of TLS. It MUST NOT be sent by compliant implementations.",
  [AlertDescription.ProtocolVersion]: "The protocol version the client has attempted to negotiate is recognized but not supported. (For example, old protocol versions might be avoided for security reasons.) This message is always fatal.",
  [AlertDescription.InsufficientSecurity]: "Returned instead of handshake_failure when a negotiation has failed specifically because the server requires ciphers more secure than those supported by the client. This message is always fatal.",
  [AlertDescription.InternalError]: "An internal error unrelated to the peer or the correctness of the protocol (such as a memory allocation failure) makes it impossible to continue. This message is always fatal",
  [AlertDescription.UserCanceled]: "This handshake is being canceled for some reason unrelated to a protocol failure. If the user cancels an operation after the handshake is complete, just closing the connection by sending a close_notify is more appropriate. This alert should be followed by a close_notify. This message is generally a warning.",
  [AlertDescription.NoRenegotation]: "Sent by the client in response to a hello request or by the server in response to a client hello after initial handshaking. Either of these would normally lead to renegotiation; when that is not appropriate, the recipient should respond with this alert. At that point, the original requester can decide whether to proceed with the connection. One case where this would be appropriate is where a server has spawned a process to satisfy a request; the process might receive security parameters (key length, authentication, etc.) at startup, and it might be difficult to communicate changes to these parameters after that point. This message is always a warning.",
  [AlertDescription.UnsupportedExtension]: "sent by clients that receive an extended server hello containing an extension that they did not put in the corresponding client hello. This message is always fatal.",
}

export class AlertPacket implements BinaryObjectInstance {
  static deserialize(reader: BinaryReader) {
    return new AlertPacket(
      reader.readUInt8(),
      reader.readUInt8(),
    );
  }

  constructor(protected readonly level: AlertLevel, protected readonly description: AlertDescription) {}

  isFatal() {
    return this.level === AlertLevel.Fatal;
  }

  isWarning() {
    return this.level === AlertLevel.Warning;
  }

  getDescription() {
    return this.description;
  }

  toString() {
    return `[${AlertLevel[this.level]}] (${AlertDescription[this.description]}): ${ALERT_DESCRIPTION_STR_EN[this.description]}`;
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(2);

    writer.writeUInt8(this.level);
    writer.writeUInt8(this.description);

    return writer;
  }
}
