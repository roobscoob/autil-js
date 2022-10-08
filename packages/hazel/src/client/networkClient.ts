import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { MessageReader, MessageWriter } from "..";

export enum WriteMethod {
  Reliable,
  Unrealiable,
}

export abstract class NetworkClient {
  private recieveHandlers: Set<(packet: MessageReader) => void> = new Set();
  private disconnectHandlers: Set<(data?: BinaryReader) => void> = new Set();

  abstract connect(data: BinaryWriter): Promise<void>;
  abstract write(method: WriteMethod, ...packets: MessageWriter[]): Promise<void>;
  abstract disconnect(data: BinaryWriter): void;

  addRecieveHandler(handler: (packet: MessageReader) => void): void {
    this.recieveHandlers.add(handler);
  }

  addDisconnectHandler(handler: (data?: BinaryReader) => void): void {
    this.disconnectHandlers.add(handler);
  }

  emitRecieve(packet: MessageReader) {
    for (const handler of this.recieveHandlers) {
      handler(packet);
    }
  }

  emitDisconect(data?: BinaryReader) {
    for (const handler of this.disconnectHandlers) {
      handler(data);
    }
  }
}
