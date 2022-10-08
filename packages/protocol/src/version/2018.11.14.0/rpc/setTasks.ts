import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcSetTasks } from "../../abstract/rpc/setTasks";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcSetTasks_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcSetTasks {
  static fromAbstract(data: RpcSetTasks): RpcSetTasks_V2018_11_14_0 {
    return new RpcSetTasks_V2018_11_14_0(data.getNetId(), data.getPlayerId(), [...data.getTaskIds()]);
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (!reader.hasBytesLeftToRead())
      return undefined;

    const playerId = reader.readUInt8();
    let length;

    try {
      length = reader.readPackedUInt32();
    } catch(err) {
      return undefined;
    }

    if (reader.countRemainingBytes() != length)
      return undefined;

    return new RpcSetTasks_V2018_11_14_0(
      netId,
      playerId,
      reader.readArray(length, r => r.readUInt8())
    )
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcSetTasks_V2018_11_14_0(
      netId,
      reader.readUInt8(),
      reader.readArray(reader.readPackedUInt32(), r => r.readUInt8()),
    );
  }

  constructor(
    netId: number,
    protected readonly playerId: number,
    protected readonly taskIds: number[],
  ) { super(netId) }

  getCallId() { return 0 }

  isRpcSetTasks(): this is RpcSetTasks {
    return true;
  }

  getPlayerId(): number {
    return this.playerId;
  }

  getTaskIds(): number[] {
    return this.taskIds;
  }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(6 + this.getTaskIds().length);

    writer.writeUInt8(this.getPlayerId());
    writer.writePackedUInt32(this.getTaskIds().length);

    for (const taskId of this.getTaskIds()) {
      writer.writeUInt8(taskId);
    }

    return writer;
  }
}
