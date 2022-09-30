import * as NodeUdp from "node:dgram";
import { Socket } from "@autil/hazel"

export class NodeUdpSocket extends Socket {
  protected readonly socket: NodeUdp.Socket;
  protected readonly recieveHandlers: Set<(binary: ArrayBuffer) => void> = new Set();
  protected readonly disconnectHandlers: Set<() => void> = new Set();

  constructor(protected ip: string, protected port: number) {
    super();

    this.socket = NodeUdp.createSocket("udp4");

    this.socket.addListener("message", message => {
      this.recieveHandlers.forEach(handler => handler(message.buffer));
    })

    this.socket.addListener("close", () => {
      this.disconnectHandlers.forEach(handler => handler());
    })
  }

  async connect() {}

  send(binary: ArrayBuffer): void {
    this.socket.send(new Uint8Array(binary), this.port, this.ip);
  }

  addRecieveHandler(handler: (binary: ArrayBuffer) => void): void {
    this.recieveHandlers.add(handler);
  }

  addDisconnectHandler(handler: () => void): void {
    this.disconnectHandlers.add(handler);
  }
}
