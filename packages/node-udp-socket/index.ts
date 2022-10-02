import * as NodeUdp from "node:dgram";
import { ClientSocket } from "@autil/hazel"

export class NodeUdpSocket extends ClientSocket {
  protected socket?: NodeUdp.Socket;

  constructor(protected ip: string, protected port: number) {
    super();
  }

  async connect() {
    this.socket = NodeUdp.createSocket("udp4");

    this.socket.addListener("message", message => {
      this.emitRecieve(message);
    })

    this.socket.addListener("error", (error) => {
      this.emitError(error)
    })
  }

  async close(): Promise<void> {
    if (this.socket == undefined)
      throw new Error("Cannot close a socket that wasn't opened.");

    this.socket.close();
  }

  send(binary: ArrayBuffer): void {
    if (this.socket == undefined)
      throw new Error("Canont send on a socket that wasn't opened.");

    this.socket.send(new Uint8Array(binary), this.port, this.ip);
  }
}
