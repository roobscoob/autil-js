import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcCloseDoorsOfType } from "../../abstract/rpc/closeDoorsOfType";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcCloseDoorsOfType_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcCloseDoorsOfType {
  static fromAbstract(data: RpcCloseDoorsOfType): RpcCloseDoorsOfType_V2018_11_14_0 {
    return new RpcCloseDoorsOfType_V2018_11_14_0(data.getNetId(), data.getSystemType());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() != 1)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcCloseDoorsOfType_V2018_11_14_0(
      netId,
      reader.readUInt8(),
    );
  }

  constructor(
    netId: number,
    protected readonly systemType: number,
  ) { super(netId) }

  getCallId() { return 0 }

  isRpcCloseDoorsOfType(): this is RpcCloseDoorsOfType {
    return true;
  }

  getSystemType() {
    return this.systemType;
  }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(1);

    writer.writeUInt8(this.getSystemType());

    return writer;
  }
}
