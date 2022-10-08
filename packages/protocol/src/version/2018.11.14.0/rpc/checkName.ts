import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcCheckName } from "../../abstract/rpc/checkName";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcCheckName_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcCheckName {
  static fromAbstract(data: RpcCheckName): RpcCheckName_V2018_11_14_0 {
    return new RpcCheckName_V2018_11_14_0(data.getNetId(), data.getName());
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
    return new RpcCheckName_V2018_11_14_0(netId, reader.readString(reader.readPackedUInt32()));
  }

  constructor(netId: number, protected readonly name: string) { super(netId) }

  getCallId() { return 5 }

  getName() {
    return this.name;
  }

  isRpcCheckName(): this is RpcCheckName {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
