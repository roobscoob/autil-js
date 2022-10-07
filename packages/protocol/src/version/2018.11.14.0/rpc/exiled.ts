import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcExiled } from "../../abstract/rpc/exiled";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcExiled_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcExiled {
  static fromAbstract(data: RpcExiled): RpcExiled_V2018_11_14_0 {
    return new RpcExiled_V2018_11_14_0(data.getNetId());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.hasBytesLeftToRead())
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcExiled_V2018_11_14_0(netId);
  }

  constructor(netId: number) { super(netId) }

  getCallId() { return 4 }

  isRpcExiled(): this is RpcExiled {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
