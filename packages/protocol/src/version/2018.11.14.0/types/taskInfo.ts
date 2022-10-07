import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { PlayerTask } from "../../abstract/types/playerTask";

export class PlayerTask_V2018_11_14_0 extends PlayerTask {
  static fromAbstract(data: PlayerTask) {
    return new PlayerTask_V2018_11_14_0(
      data.getTaskId(),
      data.isComplete()
    )
  }

  static deserialize(reader: BinaryReader) {
    return new PlayerTask_V2018_11_14_0(
      reader.readPackedUInt32(),
      reader.readBoolean(),
    );
  }

  constructor(
    protected readonly taskId: number,
    protected readonly completed: boolean,
  ) { super() }

  getTaskId() { return this.taskId }
  isComplete() { return this.completed }

  serialize(): BinaryWriter {
    const alloc = BinaryWriter.allocate(7);

    alloc.writePackedUInt32(this.getTaskId());
    alloc.writeBoolean(this.isComplete());

    return alloc;
  }
}
