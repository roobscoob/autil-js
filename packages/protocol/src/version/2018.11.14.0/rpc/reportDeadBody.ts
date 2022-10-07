import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcReportDeadBody } from "../../abstract/rpc/reportDeadBody";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcReportDeadBody_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcReportDeadBody {
  static fromAbstract(data: RpcReportDeadBody): RpcReportDeadBody_V2018_11_14_0 {
    return new RpcReportDeadBody_V2018_11_14_0(data.getNetId(), data.getDeadBodyPlayerControlNetId());
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
    return new RpcReportDeadBody_V2018_11_14_0(netId, reader.readPackedUInt32());
  }

  constructor(netId: number, protected readonly pcnid: number) { super(netId) }

  getCallId() { return 10 }

  getDeadBodyPlayerControlNetId() {
    return this.pcnid;
  }

  isRpcReportDeadBody(): this is RpcReportDeadBody {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
