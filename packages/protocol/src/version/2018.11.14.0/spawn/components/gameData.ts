import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnComponent_V2018_11_14_0 } from ".";
import { SpawnGameDataComponent } from "../../../abstract/spawn/components/gameData";
import { PlayerInfo_V2018_11_14_0 } from "../../types/playerInfo";

export class SpawnGameDataComponent_V2018_11_14_0 extends SpawnComponent_V2018_11_14_0 implements SpawnGameDataComponent {
  static fromAbstract(data: SpawnGameDataComponent) {
    return new SpawnGameDataComponent_V2018_11_14_0(
      data.getNetId(),
      data.getGuid(),
      data.hasGameStarted(),
      data.getPlayerInfo().map(p => PlayerInfo_V2018_11_14_0.fromAbstract(p)),
    )
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const guid = reader.readBytes(reader.readPackedUInt32()).getBuffer().buffer;
    const gameStarted = reader.readBoolean();
    const players = reader.readArray(reader.readUInt8(), r => r.read(PlayerInfo_V2018_11_14_0))

    return new SpawnGameDataComponent_V2018_11_14_0(netId, guid, gameStarted, players);
  }

  constructor(
    netId: number,
    protected readonly guid: ArrayBuffer,
    protected readonly gameStarted: boolean,
    protected readonly players: PlayerInfo_V2018_11_14_0[],
  ) { super(netId) }

  isGameData(): this is SpawnGameDataComponent {
    return true;
  }

  getGuid() { return this.guid }
  hasGameStarted() { return this.gameStarted }
  getPlayerInfo() { return this.players }

  serializeContents(): MessageWriter {
    const serializedPlayerInfos = this.getPlayerInfo().map(p => p.serialize().getBuffer());

    const message = MessageWriter.allocate(8 + this.getGuid().byteLength + serializedPlayerInfos.reduce((p, c) => p + c.byteLength, 0));

    message.writePackedUInt32(this.getGuid().byteLength);
    message.writeBytes(this.getGuid());
    message.writeBoolean(this.hasGameStarted());
    message.writeUInt8(this.getPlayerInfo().length);

    for (const serializedPlayerInfo of serializedPlayerInfos) {
      message.writeBytes(serializedPlayerInfo);
    }

    return message;
  }
}
