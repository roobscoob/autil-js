import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { JoinedGameS2C } from "../../../abstract/rootPackets/joinedGame";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";

export class JoinedGameS2C_V2018_11_14_0 extends JoinedGameS2C {
  static fromAbstract(data: JoinedGameS2C) {
    return new JoinedGameS2C_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
      data.getClientId(),
      data.getHostId(),
      // to clone the array
      [...data.getClientIdsInGame()],
    )
  }

  static deserialize(reader: BinaryReader) {
    return new JoinedGameS2C_V2018_11_14_0(
      reader.read(GameCode_V2018_11_14_0),
      reader.readSInt32LE(),
      reader.readSInt32LE(),
      reader.readArray(reader.readPackedInt32(), r => r.readPackedInt32()),
    )
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
    protected readonly clientId: number,
    protected readonly hostClientId: number,
    protected readonly otherClientIds: number[],
  ) { super() }

  getGameCode() { return this.gameCode }
  getClientId() { return this.clientId }
  getHostId() { return this.hostClientId }
  getClientIdsInGame() { return this.otherClientIds }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.JoinedGame, 12 + (6 + (6 * this.getClientIdsInGame().length)));

    writer.write(this.getGameCode());
    writer.writeSInt32LE(this.getClientId());
    writer.writeSInt32LE(this.getHostId());
    writer.writePackedInt32(this.getClientIdsInGame().length);

    for (const clientId of this.getClientIdsInGame()) {
      writer.writePackedInt32(clientId);
    }

    return writer;
  }
}
