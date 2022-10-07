import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { JoinGameC2S } from "../../../abstract/rootPackets/joinGame";
import { GameCode } from "../../../abstract/types/gameCode";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";

export class JoinGameC2S_V2018_11_14_0 extends JoinGameC2S {
  static fromAbstract(data: JoinGameC2S) {
    return new JoinGameC2S_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
    )
  }

  static tryDeserialize(reader: BinaryReader) {
    if (reader.countRemainingBytes() !== 4)
      return undefined;

    return this.deserialize(reader);
  }

  static deserialize(reader: BinaryReader) {
    return new JoinGameC2S_V2018_11_14_0(reader.read(GameCode_V2018_11_14_0));
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
  ) { super() }

  getGameCode() { return this.gameCode }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.JoinGame, 4);
    writer.write(this.getGameCode());
    return writer;
  }
}
