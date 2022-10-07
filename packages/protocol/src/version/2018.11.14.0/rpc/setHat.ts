import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcSetHat } from "../../abstract/rpc/setHat";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcSetHat_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcSetHat {
  static fromAbstract(data: RpcSetHat): RpcSetHat_V2018_11_14_0 {
    return new RpcSetHat_V2018_11_14_0(data.getNetId(), data.getHat());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    try {
      const v = this.deserializeContents(reader, netId);

      if (reader.hasBytesLeftToRead())
        return undefined;

      return v;
    } catch (err) {
      return undefined;
    }
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcSetHat_V2018_11_14_0(netId, reader.readPackedUInt32());
  }

  constructor(netId: number, protected readonly hat: number) { super(netId) }

  getCallId() { return 9 }

  getHat() {
    return this.hat;
  }

  isRpcSetHat(): this is RpcSetHat {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
