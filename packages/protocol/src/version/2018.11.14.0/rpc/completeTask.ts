import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcCompleteTask } from "../../abstract/rpc/completeTask";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";

export class RpcGameDataCompleteTask_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcCompleteTask {
  static fromAbstract(data: RpcCompleteTask): RpcGameDataCompleteTask_V2018_11_14_0 {
    const pc = data.getPlayerControlNetId();

    if (!pc)
      throw new Error(`RpcGameDataCompleteTask_V2018_11_14_0 requires PlayerControlNetId`);

    return new RpcGameDataCompleteTask_V2018_11_14_0(data.getNetId(), pc, data.getTaskId());
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
    return new RpcGameDataCompleteTask_V2018_11_14_0(netId, reader.readPackedUInt32(), reader.readPackedUInt32());
  }

  constructor(
    netId: number,
    protected readonly playerControlNetId: number,
    protected readonly taskId: number,
  ) { super(netId) }

  getCallId() { return 1 }

  getPlayerControlNetId() { return this.playerControlNetId }
  getTaskId() { return this.taskId }

  isRpcCompleteTask(): this is RpcCompleteTask {
    return true;
  }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(12);

    writer.writePackedUInt32(this.getPlayerControlNetId());
    writer.writePackedUInt32(this.getTaskId());

    return writer;
  }
}

export class RpcPlayerControlCompleteTask_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcCompleteTask {
  static fromAbstract(data: RpcCompleteTask): RpcPlayerControlCompleteTask_V2018_11_14_0 {
    return new RpcPlayerControlCompleteTask_V2018_11_14_0(data.getNetId(), data.getTaskId());
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    try {
      let v = this.deserializeContents(reader, netId);

      if (reader.hasBytesLeftToRead())
        return undefined;

      return v;
    } catch (err) {
      return undefined;
    }
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcPlayerControlCompleteTask_V2018_11_14_0(netId, reader.readPackedUInt32());
  }

  constructor(
    netId: number,
    protected readonly taskId: number,
  ) { super(netId) }

  getCallId() { return 1 }

  getPlayerControlNetId() { return this.getNetId() }
  getTaskId() { return this.taskId }

  isRpcCompleteTask(): this is RpcCompleteTask {
    return true;
  }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(6);

    writer.writePackedUInt32(this.getTaskId())

    return writer;
  }
}
