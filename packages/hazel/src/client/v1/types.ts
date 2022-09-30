import type { V1AcknowledgementPacket, V1DisconnectPacket, V1HelloPacket, V1NormalPacket, V1PingPacket, V1ReliablePacket } from "../.."

export type V1Packets = V1AcknowledgementPacket
  | V1DisconnectPacket
  | V1HelloPacket
  | V1NormalPacket
  | V1PingPacket
  | V1ReliablePacket

export type V1ReliablePackets = Extract<V1Packets, { getNonce(): number }>
