import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcExitAllVents } from "../../abstract/rpc/exitAllVents";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcExitAllVents_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcExitAllVents {
  static fromAbstract(data: RpcExitAllVents): RpcExitAllVents_V2018_11_14_0 {
    return new RpcExitAllVents_V2018_11_14_0(data.getNetId());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.hasBytesLeftToRead())
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcExitAllVents_V2018_11_14_0(netId);
  }

  constructor(netId: number) { super(netId) }

  getCallId() { return 2 }

  isRpcExitAllVents(): this is RpcExitAllVents {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
