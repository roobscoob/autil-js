import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class EndGame extends BaseRootPacket {
  abstract getGameCode(): GameCode;

  isEndGame(): this is EndGame {
    return true;
  }
}

export class EndGameData extends EndGame {
  constructor(
    protected readonly gameCode: GameCode
  ) { super() }

  getGameCode() { return this.gameCode }
}
