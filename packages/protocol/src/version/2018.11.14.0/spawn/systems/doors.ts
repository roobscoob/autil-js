import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnDoorsSystem } from "../../../abstract/spawn/systems/doors";
import { Doorway_V2018_11_14_0 } from "../../types/doorway";

export class SpawnDoorsSystem_V2018_11_14_0 extends SpawnDoorsSystem {
  static fromAbstract(data: SpawnDoorsSystem) {
    return new SpawnDoorsSystem_V2018_11_14_0(data.getDoorways().map(d => Doorway_V2018_11_14_0.fromAbstract(d)))
  }

  static deserialize(reader: BinaryReader, doorCount: number) {
    return new SpawnDoorsSystem_V2018_11_14_0(reader.readArray(doorCount, r => r.read(Doorway_V2018_11_14_0)));
  }

  constructor(
    protected readonly doorways: Doorway_V2018_11_14_0[],
  ) { super() }

  getDoorways() { return this.doorways }

  serialize() {
    const serializedDoorways = this.getDoorways().map(doorway => doorway.serialize().getBuffer())

    const writer = BinaryWriter.allocate(serializedDoorways.reduce((p, c) => p + c.byteLength, 0));

    for (const serializedDoorway of serializedDoorways) {
      writer.writeBytes(serializedDoorway);
    }

    return writer;
  }
}
