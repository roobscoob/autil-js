import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateDoorsSystem } from "../../../abstract/update/systems/doors";
import { Doorway_V2018_11_14_0 } from "../../types/doorway";

export class UpdateDoorsSystem_V2018_11_14_0 extends UpdateDoorsSystem {
  static fromAbstract(data: UpdateDoorsSystem) {
    return new UpdateDoorsSystem_V2018_11_14_0(
      new Array(32).fill(0).map((_, i) => {
        const doorway = data.getDoorway(i);

        if (doorway) return Doorway_V2018_11_14_0.fromAbstract(doorway);

        return undefined;
      })
    )
  }

  static deserialize(reader: BinaryReader) {
    const dirtyBits = reader.readPackedUInt32();
    const doorways: (Doorway_V2018_11_14_0 | undefined)[] = [];

    for (let i = 0; i < 32; i++) {
      if (dirtyBits & (1 << i))
        doorways[i] = reader.read(Doorway_V2018_11_14_0);
    }

    return new UpdateDoorsSystem_V2018_11_14_0(doorways);
  }

  constructor(
    protected readonly doorways: (Doorway_V2018_11_14_0 | undefined)[],
  ) { super() }

  getDoorway(index: number) { return this.doorways[index] }

  serialize() {
    const serializedDoorways = this.doorways.filter(e => e).map(doorway => doorway!.serialize().getBuffer());

    let dirtyBits = 0;

    for (let i = 0; i < 32; i++) {
      if (this.getDoorway(i) !== undefined)
        dirtyBits |= (1 << i)
    }

    const writer = BinaryWriter.allocate(6 + serializedDoorways.reduce((p, c) => p + c.byteLength, 0));

    writer.writePackedUInt32(dirtyBits);

    for (const serializedDoorway of serializedDoorways) {
      writer.writeBytes(serializedDoorway);
    }

    return writer;
  }
}
