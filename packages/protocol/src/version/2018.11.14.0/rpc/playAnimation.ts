import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcPlayAnimation } from "../../abstract/rpc/playAnimation";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcPlayAnimation_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcPlayAnimation {
  static fromAbstract(data: RpcPlayAnimation): RpcPlayAnimation_V2018_11_14_0 {
    return new RpcPlayAnimation_V2018_11_14_0(data.getNetId(), data.getAnimationId());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() != 1)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcPlayAnimation_V2018_11_14_0(
      netId,
      reader.readUInt8(),
    );
  }

  constructor(
    netId: number,
    protected readonly animationId: number,
  ) { super(netId) }

  getCallId() { return 0 }

  isRpcPlayAnimation(): this is RpcPlayAnimation {
    return true;
  }

  getAnimationId() {
    return this.animationId;
  }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(1);

    writer.writeUInt8(this.getAnimationId());

    return writer;
  }
}
