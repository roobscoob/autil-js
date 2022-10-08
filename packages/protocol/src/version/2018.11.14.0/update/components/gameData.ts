import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateGameDataComponent } from "../../../abstract/update/components/gameData";
import { GameObjectUpdate_V2018_11_14_0 } from "../../gameObject/update";
import { PlayerInfo_V2018_11_14_0 } from "../../types/playerInfo";

export class UpdateGameDataComponent_V2018_11_14_0 extends GameObjectUpdate_V2018_11_14_0 implements UpdateGameDataComponent {
  static fromAbstract(data: UpdateGameDataComponent) {
    return new UpdateGameDataComponent_V2018_11_14_0(
      data.getNetId(),
      data.hasGameStarted(),
      data.getPlayerInfo().map(p => PlayerInfo_V2018_11_14_0.fromAbstract(p))
    )
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const gameStarted = reader.readBoolean();
    const players = reader.readArray(reader.readUInt8(), r => r.read(PlayerInfo_V2018_11_14_0))

    return new UpdateGameDataComponent_V2018_11_14_0(netId, gameStarted, players);
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() < 2)
      return undefined;

    const gameStarted = reader.readBoolean();
    const playerCount = reader.readUInt8();

    if (playerCount > 0 && reader.countRemainingBytes() === 0)
      return undefined;

    let players: PlayerInfo_V2018_11_14_0[] = [];

    for (let i = 0; i < playerCount; i++) {
      try {
        players.push(reader.read(PlayerInfo_V2018_11_14_0));
      } catch(e) {
        return undefined;
      }
    }

    if (reader.hasBytesLeftToRead())
      return undefined;

    return new UpdateGameDataComponent_V2018_11_14_0(netId, gameStarted, players)
  }

  constructor(
    netId: number,
    protected readonly gameStarted: boolean,
    protected readonly players: PlayerInfo_V2018_11_14_0[],
  ) { super(netId) }

  isUpdateGameData(): this is UpdateGameDataComponent {
    return true;
  }

  hasGameStarted() { return this.gameStarted }
  getPlayerInfo() { return this.players }

  serializeContents(): MessageWriter {
    const serializedPlayerInfos = this.getPlayerInfo().map(p => p.serialize().getBuffer());

    const message = MessageWriter.allocate(2 + serializedPlayerInfos.reduce((p, c) => p + c.byteLength, 0));

    message.writeBoolean(this.hasGameStarted());
    message.writeUInt8(this.getPlayerInfo().length);

    for (const serializedPlayerInfo of serializedPlayerInfos) {
      message.writeBytes(serializedPlayerInfo);
    }

    return message;
  }
}
