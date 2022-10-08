import { SpawnComponent } from ".";
import { PlayerInfo } from "../../types/playerInfo";

export abstract class SpawnGameDataComponent extends SpawnComponent {
  isGameData(): this is SpawnGameDataComponent {
    return true;
  }

  abstract getGuid(): ArrayBuffer;
  abstract hasGameStarted(): boolean;
  abstract getPlayerInfo(): PlayerInfo[];
}

export class SpawnGameDataComponentData extends SpawnGameDataComponent {
  constructor(
    protected readonly netId: number,
    protected readonly guid: ArrayBuffer,
    protected readonly gameStarted: boolean,
    protected readonly playerInfo: PlayerInfo[],
  ) { super() }

  getNetId() { return this.netId }
  getGuid() { return this.guid };
  hasGameStarted() { return this.gameStarted }
  getPlayerInfo() { return this.playerInfo }
}
