import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { StartGameS2C } from "../../../abstract/rootPackets/startGame";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";

export class StartGameS2C_V2018_11_14_0 extends StartGameS2C {
  static fromAbstract(data: StartGameS2C) {
    return new StartGameS2C_V2018_11_14_0();
  }

  static tryDeserialize(reader: BinaryReader) {
    if (reader.countRemainingBytes() !== 0)
      return undefined;

    return new StartGameS2C_V2018_11_14_0();
  }

  static deserialize(reader: BinaryReader) {
    return new StartGameS2C_V2018_11_14_0()
  }

  constructor() { super() }

  serialize(): MessageWriter {
    return MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.StartGame, 0);
  }
}
