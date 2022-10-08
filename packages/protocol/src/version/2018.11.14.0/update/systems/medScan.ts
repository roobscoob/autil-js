import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateMedScanSystem } from "../../../abstract/update/systems/medScan";

export class UpdateMedScanSystem_V2018_11_14_0 extends UpdateMedScanSystem {
  static fromAbstract(data: UpdateMedScanSystem) {
    return new UpdateMedScanSystem_V2018_11_14_0(data.getCurrentPlayerId())
  }

  static deserialize(reader: BinaryReader) {
    const p = reader.readUInt8();

    if (p < 0) {
      return new UpdateMedScanSystem_V2018_11_14_0(undefined);
    }

    return new UpdateMedScanSystem_V2018_11_14_0(p);
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
