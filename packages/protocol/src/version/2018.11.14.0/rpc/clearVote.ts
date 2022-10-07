import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcClearVote } from "../../abstract/rpc/clearVote";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcClearVote_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcClearVote {
  static fromAbstract(data: RpcClearVote): RpcClearVote_V2018_11_14_0 {
    return new RpcClearVote_V2018_11_14_0(data.getNetId());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.hasBytesLeftToRead())
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcClearVote_V2018_11_14_0(netId);
  }

  constructor(netId: number) { super(netId) }

  getCallId() { return 3 }

  isRpcClearVote(): this is RpcClearVote {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
