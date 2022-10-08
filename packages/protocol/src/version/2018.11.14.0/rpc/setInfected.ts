import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcSetInfected } from "../../abstract/rpc/setInfected";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcSetInfected_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcSetInfected {
  static fromAbstract(data: RpcSetInfected): RpcSetInfected_V2018_11_14_0 {
    return new RpcSetInfected_V2018_11_14_0(data.getNetId(), [...data.getInfectedPlayerControlNetIds()]);
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
    return new RpcSetInfected_V2018_11_14_0(netId, reader.readArray(reader.readPackedUInt32(), r => r.readPackedUInt32()));
  }

  constructor(netId: number, protected readonly pcnetids: number[]) { super(netId) }

  getCallId() { return 3 }

  getInfectedPlayerControlNetIds(): number[] {
    return this.pcnetids;
  }

  isRpcSetInfected(): this is RpcSetInfected {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
