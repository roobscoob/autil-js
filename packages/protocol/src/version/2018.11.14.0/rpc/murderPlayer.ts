import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcMurderPlayer } from "../../abstract/rpc/murderPlayer";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcMurderPlayer_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcMurderPlayer {
  static fromAbstract(data: RpcMurderPlayer): RpcMurderPlayer_V2018_11_14_0 {
    return new RpcMurderPlayer_V2018_11_14_0(data.getNetId(), data.getTargetPlayerControlNetId());
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
    return new RpcMurderPlayer_V2018_11_14_0(netId, reader.readPackedUInt32());
  }

  constructor(netId: number, protected readonly pcnid: number) { super(netId) }

  getCallId() { return 11 }

  getTargetPlayerControlNetId() {
    return this.pcnid;
  }

  isRpcMurderPlayer(): this is RpcMurderPlayer {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
