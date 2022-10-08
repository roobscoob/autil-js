import { BinaryWriter } from "@autil/helpers";

export abstract class GameCode {
  abstract getCode(): string;
}

export class GameCodeData extends GameCode {
  constructor(protected readonly gameCode: string) { super() }

  getCode() { return this.gameCode }
}
