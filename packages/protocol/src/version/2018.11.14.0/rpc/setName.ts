import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcSetName } from "../../abstract/rpc/setName";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcSetName_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcSetName {
  static fromAbstract(data: RpcSetName): RpcSetName_V2018_11_14_0 {
    return new RpcSetName_V2018_11_14_0(data.getNetId(), data.getName());
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
    return new RpcSetName_V2018_11_14_0(netId, reader.readString(reader.readPackedUInt32()));
  }

  constructor(netId: number, protected readonly name: string) { super(netId) }

  getCallId() { return 6 }

  getName() {
    return this.name;
  }

  isRpcSetName(): this is RpcSetName {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
