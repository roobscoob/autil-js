import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class JoinGameS2CRejection extends BaseRootPacket {
  abstract getDisconnectReason(): number;

  isJoinGameS2CRejection(): this is JoinGameS2CRejection {
    return true;
  }
}

export abstract class JoinGameS2CBroadcast extends BaseRootPacket {
  abstract getGameCode(): GameCode;
  abstract getJoiningClientId(): number;
  abstract getHostClientId(): number;

  isJoinGameS2CBroadcast(): this is JoinGameS2CBroadcast {
    return true;
  }
}

export abstract class JoinGameC2S extends BaseRootPacket {
  abstract getGameCode(): GameCode;

  isJoinGameC2S(): this is JoinGameC2S {
    return true;
  }
}

export class JoinGameS2CRejectionData extends JoinGameS2CRejection {
  constructor(
    protected readonly disconnectReason: number,
  ) { super() }

  getDisconnectReason() { return this.disconnectReason }
}

export class JoinGameS2CBroadcastData extends JoinGameS2CBroadcast {
  constructor(
    protected readonly gameCode: GameCode,
    protected readonly joiningClientId: number,
    protected readonly hostClientId: number,
  ) { super() }

  getGameCode() { return this.gameCode }
  getJoiningClientId() { return this.joiningClientId }
  getHostClientId() { return this.hostClientId }
}

export class JoinGameC2SData extends JoinGameC2S {
  constructor(
    protected readonly gameCode: GameCode,
  ) { super() }

  getGameCode() { return this.gameCode }
}
