import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { Doorway } from "../../abstract/types/doorway";
import { GameCode_V2018_11_14_0 } from "./gameCode";

export class Doorway_V2018_11_14_0 extends Doorway {
  static fromAbstract(data: Doorway) {
    return new Doorway_V2018_11_14_0(
      data.isOpen(),
    )
  }

  static deserialize(reader: BinaryReader) {
    return new Doorway_V2018_11_14_0(
      reader.readBoolean()
    );
  }

  constructor(
    protected readonly open: boolean,
  ) { super() }

  isOpen() { return this.open }

  serialize(): BinaryWriter {
    const alloc = BinaryWriter.allocate(1);

    alloc.writeBoolean(this.isOpen())

    return alloc;
  }
}
