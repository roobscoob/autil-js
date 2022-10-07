import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcStartMeeting } from "../../abstract/rpc/startMeeting";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcStartMeeting_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcStartMeeting {
  static fromAbstract(data: RpcStartMeeting): RpcStartMeeting_V2018_11_14_0 {
    return new RpcStartMeeting_V2018_11_14_0(data.getNetId(), data.getReportedBodyPlayerControlNetId());
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
    return new RpcStartMeeting_V2018_11_14_0(netId, reader.readPackedUInt32());
  }

  constructor(netId: number, protected readonly pcnid: number) { super(netId) }

  getCallId() { return 15 }

  getReportedBodyPlayerControlNetId() {
    return this.pcnid;
  }

  isRpcStartMeeting(): this is RpcStartMeeting {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }
}
