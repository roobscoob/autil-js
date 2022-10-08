import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { V1AcknowledgementPacket, V1DisconnectPacket, V1HelloPacket, V1NormalPacket, V1PingPacket, V1ReliablePacket } from ".";
import { Bitfield, MessageReader, MessageWriter } from "../..";
import type { HazelPacketFactory } from "../factory";
import { SendOption } from "./sendOption";

export class V1PacketFactory {
  getPacket(reader: BinaryReader) {
    const PACKET_MAP = {
      [SendOption.Normal]: V1NormalPacket,
      [SendOption.Reliable]: V1ReliablePacket,
      [SendOption.Hello]: V1HelloPacket,
      [SendOption.Disconnect]: V1DisconnectPacket,
      [SendOption.Acknowledgement]: V1AcknowledgementPacket,
      [SendOption.Ping]: V1PingPacket,
    }

    const packetId = reader.readUInt8();

    const packet = PACKET_MAP[packetId as SendOption]

    if (packet === undefined)
      throw new Error("Unknown packet ID: " + packetId);

    return packet.deserialize(reader);
  }

  createNormal(...packets: (MessageWriter | MessageReader | { serialize(): MessageWriter | MessageReader })[]): V1NormalPacket {
    return new V1NormalPacket(packets.map(e => "serialize" in e ? e.serialize() : e) as any)
  }

  createReliable(nonce: number, ...packets: (MessageWriter | MessageReader | { serialize(): MessageWriter | MessageReader })[]): V1ReliablePacket {
    return new V1ReliablePacket(nonce, packets.map(e => "serialize" in e ? e.serialize() : e) as any)
  }

  createHello(nonce: number, content: BinaryWriter | BinaryReader | { serialize(): BinaryWriter | BinaryReader }) {
    return new V1HelloPacket(nonce, 1, ("serialize" in content ? content.serialize() : content).getBuffer().buffer);
  }

  createDisconnect(content: BinaryWriter | BinaryReader | { serialize(): BinaryWriter | BinaryReader }) {
    return new V1DisconnectPacket(("serialize" in content ? content.serialize() : content).getBuffer().buffer);
  }

  createAcknowledgement(nonce: number, ackHistory: Bitfield) {
    return new V1AcknowledgementPacket(nonce, ackHistory);
  }

  createPing(nonce: number) {
    return new V1PingPacket(nonce);
  }
}
