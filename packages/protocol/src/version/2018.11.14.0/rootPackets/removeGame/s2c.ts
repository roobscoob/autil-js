import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { RemoveGameS2C } from "../../../abstract/rootPackets/removeGame";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";

export class RemoveGameS2C_V2018_11_14_0 extends RemoveGameS2C {
  static fromAbstract(data: RemoveGameS2C) {
    return new RemoveGameS2C_V2018_11_14_0();
  }

  static tryDeserialize(reader: BinaryReader) {
    if (reader.countRemainingBytes() !== 0)
      return undefined;

    return new RemoveGameS2C_V2018_11_14_0();
  }

  static deserialize(reader: BinaryReader) {
    return new RemoveGameS2C_V2018_11_14_0()
  }

  constructor() { super() }

  serialize(): MessageWriter {
    return MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.RemoveGame, 0);
  }
}
