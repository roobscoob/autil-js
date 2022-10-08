import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateReactorSystem } from "../../../abstract/update/systems/reactor";

export class UpdateReactorSystem_V2018_11_14_0 extends UpdateReactorSystem {
  static fromAbstract(data: UpdateReactorSystem) {
    return new UpdateReactorSystem_V2018_11_14_0(data.getCountdown())
  }

  static deserialize(reader: BinaryReader) {
    const f = reader.readFloat32LE();

    if (f >= 10000) {
      return new UpdateReactorSystem_V2018_11_14_0(undefined);
    }

    return new UpdateReactorSystem_V2018_11_14_0(f);
  }

  constructor(
    protected readonly countdown?: number,
  ) { super() }

  getCountdown() { return this.countdown }

  serialize(): BinaryWriter {
    const b = BinaryWriter.allocate(4);

    b.writeFloat32LE(this.getCountdown() ?? 10000);

    return b;
  }
}
