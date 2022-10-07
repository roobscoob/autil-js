import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnReactorSystem } from "../../../abstract/spawn/systems/reactor";

export class SpawnReactorSystem_V2018_11_14_0 extends SpawnReactorSystem {
  static fromAbstract(data: SpawnReactorSystem) {
    return new SpawnReactorSystem_V2018_11_14_0(data.getCountdown())
  }

  static deserialize(reader: BinaryReader) {
    const f = reader.readFloat32LE();

    if (f >= 10000) {
      return new SpawnReactorSystem_V2018_11_14_0(undefined);
    }

    return new SpawnReactorSystem_V2018_11_14_0(f);
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
