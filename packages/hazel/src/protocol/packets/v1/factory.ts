import { BinaryReader } from "@autil/helpers";
import { V1AcknowledgementPacket, V1DisconnectPacket, V1HelloPacket, V1NormalPacket, V1PingPacket, V1ReliablePacket } from ".";
import type { HazelPacketFactory } from "../factory";

const PACKET_MAP = {
  [ 0x00 as number ]: V1NormalPacket,
  [ 0x01 as number ]: V1ReliablePacket,
  [ 0x08 as number ]: V1HelloPacket,
  [ 0x09 as number ]: V1DisconnectPacket,
  [ 0x0a as number ]: V1AcknowledgementPacket,
  [ 0x0c as number ]: V1PingPacket,
}

export class V1PacketFactory {
  getPacket(reader: BinaryReader) {
    return PACKET_MAP[reader.readUInt8()].deserialize(reader);
  }
}
