import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateHudOverrideSystem } from "../../../abstract/update/systems/hudOverride";

export class UpdateHudOverrideSystem_V2018_11_14_0 extends UpdateHudOverrideSystem {
  static fromAbstract(data: UpdateHudOverrideSystem) {
    return new UpdateHudOverrideSystem_V2018_11_14_0(data.isActive() ? 0 : 2)
  }

  static deserialize(reader: BinaryReader) {
    return new UpdateHudOverrideSystem_V2018_11_14_0(reader.readUInt8())
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
