import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcCheckColor } from "../../abstract/rpc/checkColor";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcCheckColor_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcCheckColor {
  static fromAbstract(data: RpcCheckColor): RpcCheckColor_V2018_11_14_0 {
    return new RpcCheckColor_V2018_11_14_0(data.getNetId(), data.getColor());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() !== 1)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcCheckColor_V2018_11_14_0(netId, reader.readUInt8());
  }

  constructor(netId: number, protected readonly color: number) { super(netId) }

  getCallId() { return 7 }

  getColor() {
    return this.color;
  }

  isRpcCheckColor(): this is RpcCheckColor {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
