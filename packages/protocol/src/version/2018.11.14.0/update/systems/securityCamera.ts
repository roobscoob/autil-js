import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateSecurityCameraSystem } from "../../../abstract/update/systems/securityCamera";

export class UpdateSecurityCameraSystem_V2018_11_14_0 extends UpdateSecurityCameraSystem {
  static fromAbstract(data: UpdateSecurityCameraSystem) {
    return new UpdateSecurityCameraSystem_V2018_11_14_0(data.getNumberOfPlayersUsing());
  }

  static deserialize(reader: BinaryReader) {
    return new UpdateSecurityCameraSystem_V2018_11_14_0(reader.readUInt8());
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
