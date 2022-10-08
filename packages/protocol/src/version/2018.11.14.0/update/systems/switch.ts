import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateSwitchSystem } from "../../../abstract/update/systems/switch";
import { Switches_V2018_11_14_0 } from "../../types/switch";

export class UpdateSwitchSystem_V2018_11_14_0 extends UpdateSwitchSystem {
  static fromAbstract(data: UpdateSwitchSystem) {
    return new UpdateSwitchSystem_V2018_11_14_0(
      Switches_V2018_11_14_0.fromAbstract(data.getExpectedSwitches()),
      Switches_V2018_11_14_0.fromAbstract(data.getActualSwitches()),
      data.getLightRadius(),
    )
  }

  static deserialize(reader: BinaryReader) {
    const expectedSwitches = reader.read(Switches_V2018_11_14_0);
    const actualSwitches = reader.read(Switches_V2018_11_14_0);
    const lightRadius = reader.readUInt8() / 255;

    return new UpdateSwitchSystem_V2018_11_14_0(
      expectedSwitches,
      actualSwitches,
      lightRadius
    )
  }

  constructor(
    protected readonly expectedSwitches: Switches_V2018_11_14_0,
    protected readonly actualSwitches: Switches_V2018_11_14_0,
    protected readonly lightLevel: number,
  ) { super() }

  getExpectedSwitches() { return this.expectedSwitches }
  getActualSwitches() { return this.actualSwitches }
  getLightRadius() { return this.lightLevel }

  serialize() {
    const expected = this.getExpectedSwitches().serialize().getBuffer();
    const actual = this.getActualSwitches().serialize().getBuffer();

    const writer = BinaryWriter.allocate(expected.byteLength + actual.byteLength + 1);

    writer.writeBytes(expected);
    writer.writeBytes(actual);
    writer.writeUInt8(this.getLightRadius() * 255);

    return writer;
  }
}
