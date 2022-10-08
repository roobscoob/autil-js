import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { PlayerInfo } from "../../abstract/types/playerInfo";
import { PlayerTask_V2018_11_14_0 } from "./taskInfo";

1094861636

export class PlayerInfo_V2018_11_14_0 extends PlayerInfo {
  static fromAbstract(data: PlayerInfo) {
    return new PlayerInfo_V2018_11_14_0(
      data.getPlayerId(),
      data.getName(),
      data.getColor(),
      data.isDisconnected(),
      data.getTasks().map(t => PlayerTask_V2018_11_14_0.fromAbstract(t)),
    )
  }

  static deserialize(reader: BinaryReader) {
    return new PlayerInfo_V2018_11_14_0(
      reader.readUInt8(),
      reader.readString(reader.readPackedUInt32()),
      reader.readUInt8(),
      reader.readBoolean(),
      reader.readArray(reader.readUInt8(), r => r.read(PlayerTask_V2018_11_14_0))
    );
  }

  constructor(
    protected readonly playerId: number,
    protected readonly name: string,
    protected readonly color: number,
    protected readonly disconnected: boolean,
    protected readonly tasks: PlayerTask_V2018_11_14_0[],
  ) { super() }

  getPlayerId() { return this.playerId }
  getName() { return this.name }
  getColor() { return this.color }
  isDisconnected() { return this.disconnected }
  getTasks() { return this.tasks }

  serialize(): BinaryWriter {
    const serializedPlayerTasks = this.getTasks().map(t => t.serialize().getBuffer())

    const alloc = BinaryWriter.allocate(9 + this.getName().length + serializedPlayerTasks.reduce((p, c) => p + c.byteLength, 0));

    alloc.writeUInt8(this.getPlayerId());
    alloc.writePackedUInt32(this.getName().length);
    alloc.writeString(this.getName());
    alloc.writeUInt8(this.getColor());
    alloc.writeBoolean(this.isDisconnected());

    for (const serializedPlayerTask of serializedPlayerTasks) {
      alloc.writeBytes(serializedPlayerTask);
    }

    return alloc;
  }
}
