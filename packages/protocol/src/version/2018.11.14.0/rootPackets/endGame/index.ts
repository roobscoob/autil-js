import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { EndGame } from "../../../abstract/rootPackets/endGame";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";

export class EndGame_V2018_11_14_0 extends EndGame {
  static fromAbstract(data: EndGame) {
    return new EndGame_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
    )
  }

  static deserialize(reader: BinaryReader): EndGame_V2018_11_14_0{
    return new EndGame_V2018_11_14_0(reader.read(GameCode_V2018_11_14_0));
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
  ) { super() }

  getGameCode() { return this.gameCode }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.EndGame, 4);
    writer.write(this.gameCode);
    return writer;
  }
}
