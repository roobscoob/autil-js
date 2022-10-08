import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnMedScanSystem } from "../../../abstract/spawn/systems/medScan";

export class SpawnMedScanSystem_V2018_11_14_0 extends SpawnMedScanSystem {
  static fromAbstract(data: SpawnMedScanSystem) {
    return new SpawnMedScanSystem_V2018_11_14_0(data.getCurrentPlayerId());
  }

  static deserialize(reader: BinaryReader) {
    const p = reader.readUInt8();

    if (p < 0) {
      return new SpawnMedScanSystem_V2018_11_14_0(undefined);
    }

    return new SpawnMedScanSystem_V2018_11_14_0(p);
  }

  constructor(
    protected readonly playerId?: number,
  ) { super() }

  getCurrentPlayerId() { return this.playerId }

  serialize() {
    const writer = BinaryWriter.allocate(1);

    writer.writeSInt8(this.getCurrentPlayerId() ?? -1);

    return writer;
  }
}
