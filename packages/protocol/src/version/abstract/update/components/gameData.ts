import { GameObjectUpdate } from "../../gameObject/update";
import { PlayerInfo } from "../../types/playerInfo";

export abstract class UpdateGameDataComponent extends GameObjectUpdate {
  abstract hasGameStarted(): boolean;
  abstract getPlayerInfo(): PlayerInfo[];

  isUpdateGameData(): this is UpdateGameDataComponent {
    return true;
  }
}

export class UpdateGameDataComponentData extends UpdateGameDataComponent {
  constructor(
    protected readonly netId: number,
    protected readonly gameStarted: boolean,
    protected readonly playerInfo: PlayerInfo[],
  ) { super() }

  getNetId() { return this.netId }
  hasGameStarted() { return this.gameStarted }
  getPlayerInfo() { return this.playerInfo }
}
