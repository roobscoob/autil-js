import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnSecurityCameraSystem } from "../../../abstract/spawn/systems/securityCamera";

export class SpawnSecurityCameraSystem_V2018_11_14_0 extends SpawnSecurityCameraSystem {
  static fromAbstract(data: SpawnSecurityCameraSystem) {
    return new SpawnSecurityCameraSystem_V2018_11_14_0(data.getNumberOfPlayersUsing());
  }

  static deserialize(reader: BinaryReader) {
    return new SpawnSecurityCameraSystem_V2018_11_14_0(reader.readUInt8());
  }

  constructor(
    protected readonly count: number,
  ) { super() }

  getNumberOfPlayersUsing() { return this.count }

  serialize() {
    const writer = BinaryWriter.allocate(1);

    writer.writeUInt8(this.getNumberOfPlayersUsing());

    return writer;
  }
}
