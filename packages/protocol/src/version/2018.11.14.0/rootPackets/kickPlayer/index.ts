import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { KickPlayer } from "../../../abstract/rootPackets/kickPlayer";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";

export class KickPlayer_V2018_11_14_0 extends KickPlayer {
  static fromAbstract(data: KickPlayer) {
    return new KickPlayer_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
      data.getClientId(),
      data.isBanned(),
    )
  }

  static deserialize(reader: BinaryReader) {
    return new KickPlayer_V2018_11_14_0(
      reader.read(GameCode_V2018_11_14_0),
      reader.readPackedInt32(),
      reader.readBoolean(),
    )
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
    protected readonly clientId: number,
    protected readonly banned: boolean,
  ) { super() }

  getGameCode() { return this.gameCode }
  getClientId() { return this.clientId }
  isBanned() { return this.banned }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.KickPlayer, 11);

    writer.write(this.getGameCode());
    writer.writePackedInt32(this.getClientId());
    writer.writeBoolean(this.isBanned());

    return writer;
  }
}
