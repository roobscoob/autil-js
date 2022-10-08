import { BinaryWriter } from "@autil/helpers";
import { PacketAcknowledgementPromise } from ".";
import { ClientSocket } from "../..";
import { V1AcknowledgementPacket, V1DisconnectPacket, V1HelloPacket, V1NormalPacket, V1PingPacket, V1ReliablePacket } from "../../protocol/packets/v1"
import { V1Packets, V1ReliablePackets } from "./types";

export type ClientInfo = {
  clientVersion: number,
  username: string,
}

export class V1HazelClient {
  protected purgatoryReliableMessage: Map<number, PacketAcknowledgementPromise> = new Map();

  static async connect(socket: ClientSocket, clientInfo: ClientInfo): Promise<V1HazelClient> {
    await socket.connect();

    const client = new V1HazelClient(socket);

    await client.sendHello(clientInfo);

    return client;
  }

  constructor(protected readonly socket: ClientSocket) {
    socket.addRecieveHandler(this.onRecieve);
  }

  protected currentNonceIndex: number = 0;

  private onRecieve(packet: ArrayBuffer) {
    console.log("GOT", packet);
  }

  protected getNextNonce() {
    return this.currentNonceIndex++;
  }

  async sendHello(clientInfo: ClientInfo) {
    const packet = new V1HelloPacket(this.getNextNonce(), 1, clientInfo.clientVersion, clientInfo.username);
  }

  protected sendReliableLike(packet: V1ReliablePackets): PacketAcknowledgementPromise {
    const pap = new PacketAcknowledgementPromise(this, packet);

    this.purgatoryReliableMessage.set(packet.getNonce(), pap);

    pap.catch(err => {
      this.purgatoryReliableMessage.delete(packet.getNonce());
    })

    this.write(packet);

    return pap;
  }

  write(packet: V1Packets) {
    console.log("SEND", packet);
    this.socket.send(packet.serialize().getBuffer().buffer);
  }
}
