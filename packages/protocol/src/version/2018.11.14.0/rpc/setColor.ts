import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcSetColor } from "../../abstract/rpc/setColor";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcSetColor_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcSetColor {
  static fromAbstract(data: RpcSetColor): RpcSetColor_V2018_11_14_0 {
    return new RpcSetColor_V2018_11_14_0(data.getNetId(), data.getColor());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() !== 1)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcSetColor_V2018_11_14_0(netId, reader.readUInt8());
  }

  constructor(netId: number, protected readonly color: number) { super(netId) }

  getCallId() { return 8 }

  getColor() {
    return this.color;
  }

  isRpcSetColor(): this is RpcSetColor {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
