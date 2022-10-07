import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class RemovePlayerS2C extends BaseRootPacket {
  abstract getGameCode(): GameCode;
  abstract getLeavingClientId(): number;
  abstract getHostClientId(): number;

  isRemovePlayerS2C(): this is RemovePlayerS2C {
    return true;
  }
}

export class RemovePlayerS2CData extends RemovePlayerS2C {
  constructor(
    protected readonly gameCode: GameCode,
    protected readonly leavingClientId: number,
    protected readonly hostClientId: number,
  ) { super() }

  getGameCode() { return this.gameCode }
  getLeavingClientId() { return this.leavingClientId }
  getHostClientId() { return this.hostClientId }
}
