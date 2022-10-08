import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class HostGameC2S extends BaseRootPacket {
  isHostGameC2S(): this is HostGameC2S {
    return true;
  }
}

export abstract class HostGameS2C extends BaseRootPacket {
  abstract getGameCode(): GameCode;

  isHostGameS2C(): this is HostGameS2C {
    return true;
  }
}

export class HostGameC2SData extends HostGameC2S {}

export class HostGameS2CData extends HostGameS2C {
  constructor(
    protected readonly gameCode: GameCode,
  ) { super() }

  getGameCode(): GameCode { return this.gameCode }
}
