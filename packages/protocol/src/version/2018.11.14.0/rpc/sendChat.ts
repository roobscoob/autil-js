import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcSendChat } from "../../abstract/rpc/sendChat";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcSendChat_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcSendChat {
  static fromAbstract(data: RpcSendChat): RpcSendChat_V2018_11_14_0 {
    return new RpcSendChat_V2018_11_14_0(data.getNetId(), data.getChatText());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    try {
      const v = this.deserializeContents(reader, netId);

      if (reader.hasBytesLeftToRead())
        return undefined;

      return v;
    } catch(err) {
      return undefined;
    }
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcSendChat_V2018_11_14_0(netId, reader.readString(reader.readPackedUInt32()));
  }

  constructor(netId: number, protected readonly chat: string) { super(netId) }

  getCallId() { return 12 }

  getChatText() {
    return this.chat;
  }

  isRpcSendChat(): this is RpcSendChat {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
