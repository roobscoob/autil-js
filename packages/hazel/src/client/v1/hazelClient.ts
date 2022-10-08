import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { PacketAcknowledgementPromise } from ".";
import { ClientSocket, Endianness } from "../..";
import { Bitfield, MessageWriter } from "../../protocol";
import { V1AcknowledgementPacket, V1DisconnectPacket, V1HelloPacket, V1NormalPacket, V1PacketFactory, V1PingPacket, V1ReliablePacket } from "../../protocol/packets/v1"
import { NetworkClient, WriteMethod } from "../networkClient";
import { V1Packets, V1ReliablePackets } from "./types";
import { MessageReader } from "../..";
import { ReliableLikePacket } from "../../protocol/packets/v1/basePacket";

export class V1HazelClient extends NetworkClient {
  protected reliableMessagesInTransit: Map<number, PacketAcknowledgementPromise> = new Map();
  protected readonly factory = new V1PacketFactory();
  protected readonly ackHistory: {nonce: number, state: boolean}[] = [];
  protected readonly interval = setInterval(this.tick.bind(this), 1000);

  static async connect(socket: ClientSocket, data: BinaryWriter) {
    const client = new V1HazelClient(socket);
    await client.connect(data);
    return client;
  }

  constructor(protected readonly socket: ClientSocket) {
    super();

    socket.addRecieveHandler(this.onSocketRecieve.bind(this));
  }

  async connect(data: BinaryWriter): Promise<void> {
    await this.socket.connect();
    await this.sendHello(data);
  }

  protected tick() {
    this.writeHazel(this.factory.createPing(this.getNextNonce()));
  }

  protected currentNonceIndex: number = 0;

  private onSocketRecieve(buffer: ArrayBuffer) {
    const packet = this.factory.getPacket(BinaryReader.from(buffer));

    if (packet.shouldAcknowledge())
      this.acknowledge(packet);

    if (packet.isAcknowledgement()) {
      return this.handleAcknowledgementPacket(packet);
    }

    if (packet.isDisconnect()) {
      return this.handleDisconnectPacket(packet);
    }

    if (packet.isNormal() || packet.isReliable()) {
      packet.getContent().forEach(content => {
        this.emitRecieve(content instanceof MessageReader ? content : MessageReader.fromTagged(content.getTag(), content.getBuffer()));
      })

      return;
    }
  }

  protected handleDisconnectPacket(packet: V1DisconnectPacket) {
    this.cleanup("Recieved disconnect packet from server");
    this.emitDisconect(BinaryReader.from(packet.getReason()));
  }

  protected handleAcknowledgementPacket(packet: V1AcknowledgementPacket) {
    const historyEntry = this.ackHistory.find(({ nonce }) => packet.getNonce() === nonce);

    if (historyEntry)
      historyEntry.state = true;

    this.reliableMessagesInTransit.get(packet.getNonce())?.setResolved();
  }

  protected acknowledge(packet: ReliableLikePacket) {
    this.writeHazel(this.factory.createAcknowledgement(packet.getNonce(), this.getAckHistory()))
  }

  protected getAckHistory() {
    const bitfield = Bitfield.fromSize(1);

    for (let i = 0; i < this.ackHistory.length; i++) {
      const entry = this.ackHistory[i];
      bitfield.setFlag(i, entry.state);
    }

    return bitfield;
  }

  protected getNextNonce() {
    return this.currentNonceIndex++;
  }

  async sendHello(data: BinaryWriter) {
    const packet = this.factory.createHello(this.getNextNonce(), data);

    return this.writeReliableLike(packet);
  }

  protected writeReliableLike(packet: V1ReliablePackets): PacketAcknowledgementPromise {
    const pap = new PacketAcknowledgementPromise(this, packet);

    this.ackHistory.push({ nonce: packet.getNonce(), state: false });

    while (this.ackHistory.length > 8) {
      this.ackHistory.shift();
    }

    this.reliableMessagesInTransit.set(packet.getNonce(), pap);

    pap.catch(err => {
      this.reliableMessagesInTransit.delete(packet.getNonce());
    })

    return pap;
  }

  writeHazel(packet: V1Packets) {
    this.socket.send(packet.serialize().getBuffer().buffer);
  }

  disconnect(data: BinaryWriter): void {
    this.writeHazel(this.factory.createDisconnect(data));
    this.cleanup("");
  }

  protected cleanup(reason: string) {
    for (const [nonce, packet] of this.reliableMessagesInTransit.entries()) {
      packet.setDropped(reason);
    }

    clearInterval(this.interval);
    this.socket.close();
  }

  async write(method: WriteMethod, ...packets: (MessageWriter | { serialize(): MessageWriter })[]): Promise<void> {
    if (method === WriteMethod.Unrealiable) 
      return this.writeHazel(this.factory.createNormal(...packets));

    await this.writeReliableLike(this.factory.createReliable(this.getNextNonce(), ...packets));
  }
}
