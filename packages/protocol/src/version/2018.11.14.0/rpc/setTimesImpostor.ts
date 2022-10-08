import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcSetTimesImpostor } from "../../abstract/rpc/setTimesImpostor";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcSetTimesImpostor_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcSetTimesImpostor {
  static fromAbstract(data: RpcSetTimesImpostor): RpcSetTimesImpostor_V2018_11_14_0 {
    return new RpcSetTimesImpostor_V2018_11_14_0(data.getNetId(), data.getPercentImpostor());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() !== 4)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcSetTimesImpostor_V2018_11_14_0(netId, reader.readFloat32LE());
  }

  constructor(netId: number, protected readonly percImpostor: number) { super(netId) }

  getCallId() { return 13 }

  getPercentImpostor() {
    return this.percImpostor;
  }

  isRpcSetTimesImpostor(): this is RpcSetTimesImpostor {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
