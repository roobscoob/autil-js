import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcReady } from "../../abstract/rpc/ready";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcReady_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcReady {
  static fromAbstract(data: RpcReady): RpcReady_V2018_11_14_0 {
    return new RpcReady_V2018_11_14_0(data.getNetId());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.hasBytesLeftToRead())
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcReady_V2018_11_14_0(netId);
  }

  constructor(netId: number) { super(netId) }

  getCallId() { return 14 }

  isRpcReady(): this is RpcReady {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
