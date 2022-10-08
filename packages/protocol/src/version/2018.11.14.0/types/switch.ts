import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { Switches } from "../../abstract/types/switches";

export class Switches_V2018_11_14_0 extends Switches implements BinaryObjectInstance {
  static fromAbstract(_switch: Switches) {
    return new Switches_V2018_11_14_0([
      _switch.getSwitch(0) ?? false,
      _switch.getSwitch(1) ?? false,
      _switch.getSwitch(2) ?? false,
      _switch.getSwitch(3) ?? false,
      _switch.getSwitch(4) ?? false,
    ]);
  }

  static deserialize(reader: BinaryReader) {
    return this.fromByte(reader.readUInt8());
  }

  static fromByte(byte: number) {
    return new Switches_V2018_11_14_0([
      (byte & 0b0000_0001) === 1,
      (byte & 0b0000_0010) === 1,
      (byte & 0b0000_0100) === 1,
      (byte & 0b0000_1000) === 1,
      (byte & 0b0001_0000) === 1,
    ]);
  }

  constructor(protected readonly switches: boolean[]) { super() }

  getSwitch(index: number) { return this.switches[index] }

  toByte(): number {
    let b = 0;

    if (this.getSwitch(0)) b |= 0b0000_0001;
    if (this.getSwitch(1)) b |= 0b0000_0010;
    if (this.getSwitch(2)) b |= 0b0000_0100;
    if (this.getSwitch(3)) b |= 0b0000_1000;
    if (this.getSwitch(4)) b |= 0b0001_0000;

    return b;
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(4);
    writer.writeUInt8(this.toByte());
    return writer;
  }
}
