import { GameCode } from "./gameCode";

export abstract class GameListing {
  abstract getGameCode(): GameCode;
  abstract getPlayerCount(): number;
  abstract getAge(): number;
  abstract getHostName(): string;
}

export class GameListingData extends GameListing {
  constructor(
    protected readonly gameCode: GameCode,
    protected readonly playerCount: number,
    protected readonly age: number,
    protected readonly hostName: string,
  ) { super() }

  getGameCode() { return this.gameCode }
  getPlayerCount() { return this.playerCount }
  getAge() { return this.age }
  getHostName() { return this.hostName }
}
