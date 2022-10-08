import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class RemoveGameS2C extends BaseRootPacket {
  isRemoveGameS2C(): this is RemoveGameS2C {
    return true;
  }
}

export abstract class RemoveGameC2S extends BaseRootPacket {
  abstract getGameCode(): GameCode;

  isRemoveGameC2S(): this is RemoveGameC2S {
    return true;
  }
}

export class RemoveGameS2CData extends RemoveGameS2C {}

export class RemoveGameC2SData extends RemoveGameC2S {
  constructor(
    protected readonly gameCode: GameCode,
  ) { super() }

  getGameCode() { return this.gameCode }
}
