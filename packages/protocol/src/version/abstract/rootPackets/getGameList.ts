import { GameListing } from "../types/gameListing";
import { BaseRootPacket } from "./base";

export abstract class GetGameListS2C extends BaseRootPacket {
  abstract getGameListings(): GameListing[];

  isGetGameListS2C(): this is GetGameListS2C {
    return true;
  }
}

export abstract class GetGameListC2S extends BaseRootPacket {
  abstract getIncludePrivate(): boolean;

  isGetGameListC2S(): this is GetGameListC2S {
    return true;
  }
}

export class GetGameListS2CData extends GetGameListS2C {
  constructor(
    protected readonly gameListings: GameListing[],
  ) { super() }

  getGameListings() { return this.gameListings }
}

export class GetGameListC2SData extends GetGameListC2S {
  constructor(
    protected readonly includePrivate: boolean,
  ) { super() }

  getIncludePrivate() { return this.includePrivate }
}
