import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnHudOverrideSystem } from "../../../abstract/spawn/systems/hudOverride";

export class SpawnHudOverrideSystem_V2018_11_14_0 extends SpawnHudOverrideSystem {
  static fromAbstract(data: SpawnHudOverrideSystem) {
    return new SpawnHudOverrideSystem_V2018_11_14_0(data.isActive() ? 0 : 2)
  }

  static deserialize(reader: BinaryReader) {
    return new SpawnHudOverrideSystem_V2018_11_14_0(reader.readUInt8())
  }

  constructor(
    protected readonly activeState: number,
  ) { super() }

  isActive() { return this.activeState !== 2 }

  serialize() {
    const writer = BinaryWriter.allocate(1);

    writer.writeUInt8(this.activeState);

    return writer;
  }
}
