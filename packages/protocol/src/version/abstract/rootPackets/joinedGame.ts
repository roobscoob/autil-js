import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class JoinedGameS2C extends BaseRootPacket {
  abstract getGameCode(): GameCode;
  abstract getClientId(): number;
  abstract getHostId(): number;
  abstract getClientIdsInGame(): number[];

  isJoinedGameS2C(): this is JoinedGameS2C {
    return true;
  }
}

export class JoinedGameS2CData extends JoinedGameS2C {
  constructor(
    protected readonly gameCode: GameCode,
    protected readonly clientId: number,
    protected readonly hostId: number,
    protected readonly clientIdsInGame: number[],
  ) { super() }

  getGameCode() { return this.gameCode }
  getClientId() { return this.clientId }
  getHostId() { return this.hostId }
  getClientIdsInGame() { return this.clientIdsInGame }
}
