import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { RemovePlayerS2C } from "../../../abstract/rootPackets/removePlayer";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";

export class RemovePlayerS2C_V2018_11_14_0 extends RemovePlayerS2C {
  static fromAbstract(data: RemovePlayerS2C) {
    return new RemovePlayerS2C_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
      data.getLeavingClientId(),
      data.getHostClientId(),
    )
  }

  static deserialize(reader: BinaryReader): RemovePlayerS2C_V2018_11_14_0 {
    return new RemovePlayerS2C_V2018_11_14_0(
      reader.read(GameCode_V2018_11_14_0),
      reader.readSInt32LE(),
      reader.readSInt32LE(),
    )
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
    protected readonly leavingClientId: number,
    protected readonly hostClientId: number,
  ) { super() }

  getGameCode() { return this.gameCode }
  getLeavingClientId() { return this.leavingClientId }
  getHostClientId() { return this.hostClientId }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.RemovePlayer, 12);

    writer.write(this.getGameCode());
    writer.writeSInt32LE(this.getLeavingClientId());
    writer.writeSInt32LE(this.getHostClientId());

    return writer;
  }
}
