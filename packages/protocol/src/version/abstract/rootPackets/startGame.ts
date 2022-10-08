import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class StartGameS2C extends BaseRootPacket {
  isStartGameS2C(): this is StartGameS2C {
    return true;
  }
}

export abstract class StartGameC2S extends BaseRootPacket {
  abstract getGameCode(): GameCode;

  isStartGameC2S(): this is StartGameC2S {
    return true;
  }
}

export class StartGameS2CData extends StartGameS2C {}

export class StartGameC2SData extends StartGameC2S {
  constructor(
    protected readonly gameCode: GameCode,
  ) { super() }

  getGameCode() { return this.gameCode }
}
