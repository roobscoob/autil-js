import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class AlterGame extends BaseRootPacket {
  abstract getGameCode(): GameCode;

  isAlterGame(): this is AlterGame {
    return true;
  }

  isAlterGamePrivacy(): this is AlterGamePrivacy { return false };
}

export abstract class AlterGamePrivacy extends AlterGame {
  isAlterGamePrivacy(): this is AlterGamePrivacy { return true }

  abstract getPublicity(): boolean;
}

export class AlterGamePrivacyData extends AlterGamePrivacy {
  constructor(
    protected readonly gameCode: GameCode,
    protected readonly publicity: boolean,
  ) { super() }

  getGameCode() { return this.gameCode }
  getPublicity() { return this.publicity }
}
