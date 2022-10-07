import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { RemoveGameC2S } from "../../../abstract/rootPackets/removeGame";
import { GameCode } from "../../../abstract/types/gameCode";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";

export class RemoveGameC2S_V2018_11_14_0 extends RemoveGameC2S {
  static fromAbstract(data: RemoveGameC2S) {
    return new RemoveGameC2S_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
    )
  }

  static tryDeserialize(reader: BinaryReader) {
    if (reader.countRemainingBytes() !== 4)
      return undefined;

    try {
      return this.deserialize(reader);
    } catch(err) {
      return undefined;
    }
  }

  static deserialize(reader: BinaryReader): RemoveGameC2S_V2018_11_14_0 {
    return new RemoveGameC2S_V2018_11_14_0(
      reader.read(GameCode_V2018_11_14_0),
    )
  }

  constructor(
    protected readonly code: GameCode_V2018_11_14_0,
  ) { super() }

  getGameCode() { return this.code }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.RemoveGame, 4);

    writer.write(this.getGameCode());

    return writer;
  }
}
