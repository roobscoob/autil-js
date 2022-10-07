import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class WaitForHostS2C extends BaseRootPacket {
  abstract getGameCode(): GameCode;
  abstract getRejoiningClientId(): number;

  isWaitForHostS2C(): this is WaitForHostS2C {
    return true;
  }
}

export class WaitForHostS2CData extends WaitForHostS2C {
  constructor(
    protected readonly gameCode: GameCode,
    protected readonly rejoiningClientId: number,
  ) { super() }

  getGameCode() { return this.gameCode }
  getRejoiningClientId() { return this.rejoiningClientId }
}
