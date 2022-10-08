import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcSnapTo } from "../../abstract/rpc/snapTo";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcSnapTo_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcSnapTo {
  static fromAbstract(data: RpcSnapTo): RpcSnapTo_V2018_11_14_0 {
    return new RpcSnapTo_V2018_11_14_0(data.getNetId(), Vector2_V2018_11_14_0.fromAbstract(data.getPosition()), data.getSequenceId());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() != 6)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcSnapTo_V2018_11_14_0(
      netId,
      reader.read(Vector2_V2018_11_14_0),
      reader.readUInt16LE(),
    );
  }

  constructor(
    netId: number,
    protected readonly vector2: Vector2_V2018_11_14_0,
    protected readonly minSid: number,
  ) { super(netId) }

  getCallId() { return 0 }

  isRpcSnapTo(): this is RpcSnapTo {
    return true;
  }

  getPosition() { return this.vector2 }
  getSequenceId() { return this.minSid }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(6);

    writer.write(this.getPosition());
    writer.writeUInt16LE(this.getSequenceId());

    return writer;
  }
}
