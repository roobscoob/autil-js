import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcExitVent } from "../../abstract/rpc/exitVent";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";

export class RpcExitVent_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcExitVent {
  static fromAbstract(data: RpcExitVent): RpcExitVent_V2018_11_14_0 {
    return new RpcExitVent_V2018_11_14_0(data.getNetId(), data.getVentId());
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
    return new RpcExitVent_V2018_11_14_0(netId, reader.readPackedUInt32());
  }

  constructor(
    netId: number,
    protected readonly ventId: number,
  ) { super(netId) }

  getCallId() { return 1 }

  getVentId() { return this.ventId }

  isRpcExitVent(): this is RpcExitVent {
    return true;
  }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(6);

    writer.writePackedUInt32(this.getVentId());

    return writer;
  }
}
