import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcEnterVent } from "../../abstract/rpc/enterVent";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { FloatBasedVector2_V2018_11_14_0, Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcEnterVent_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcEnterVent {
  static fromAbstract(data: RpcEnterVent): RpcEnterVent_V2018_11_14_0 {
    return new RpcEnterVent_V2018_11_14_0(data.getNetId(), data.getVentId(), FloatBasedVector2_V2018_11_14_0.fromAbstract(data.getVentPosition()));
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    try {
      let v = this.deserializeContents(reader, netId);

      if (reader.hasBytesLeftToRead())
        return undefined;

      return v;
    } catch(err) {
      return undefined;
    }
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcEnterVent_V2018_11_14_0(
      netId,
      reader.readPackedInt32(),
      reader.read(FloatBasedVector2_V2018_11_14_0),
    );
  }

  constructor(
    netId: number,
    protected readonly ventId: number,
    protected readonly ventPosition: FloatBasedVector2_V2018_11_14_0,
  ) { super(netId) }

  getCallId() { return 0 }

  isRpcEnterVent(): this is RpcEnterVent {
    return true;
  }

  getVentId() { return this.ventId }
  getVentPosition() { return this.ventPosition }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(14);

    writer.writePackedInt32(this.getVentId());
    writer.write(this.getVentPosition());

    return writer;
  }
}
