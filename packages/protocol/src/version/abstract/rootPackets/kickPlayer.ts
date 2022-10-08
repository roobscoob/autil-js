import { MessageWriter } from "@autil/hazel";
import { BinaryObjectInstance, BinaryWriter } from "@autil/helpers";
import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class KickPlayer extends BaseRootPacket {
  abstract getGameCode(): GameCode;
  abstract getClientId(): number;
  abstract isBanned(): boolean;

  isKickPlayer(): this is KickPlayer {
    return true;
  }
}

export class KickPlayerData extends KickPlayer {
  constructor(
    protected readonly gameCode: GameCode,
    protected readonly clientId: number,
    protected readonly banned: boolean,
  ) { super() }

  getGameCode() { return this.gameCode }
  getClientId() { return this.clientId }
  isBanned() { return this.banned }
}
