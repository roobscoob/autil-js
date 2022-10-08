import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { GameCode } from "../../abstract/types/gameCode";

export class GameCode_V2018_11_14_0 extends GameCode implements BinaryObjectInstance {
  static fromAbstract(gameCode: GameCode) {
    return new GameCode_V2018_11_14_0(gameCode.getCode())
  }

  static deserialize(reader: BinaryReader) {
    return this.fromInt(reader.readSInt32LE());
  }

  static fromInt(gameId: number) {
    const code = String.fromCharCode(
      (gameId >> 0) & 255,
      (gameId >> 8) & 255,
      (gameId >> 16) & 255,
      (gameId >> 24) & 255,
    );
    if (code.split("").some(c => c.charCodeAt(0) < 65 || c.charCodeAt(0) > 112)) {
      throw new Error("Invalid GameCode. Characters exist outside of range A-z");
    }

    return new GameCode_V2018_11_14_0(code);
  }

  constructor(protected readonly gameCode: string) { super() }

  getCode() { return this.gameCode }

  toInt(): number {
    let code = this.getCode();

    if (code.length != 4)
      return -1;

    code = code.toUpperCase();

    return code.charCodeAt(0) | (code.charCodeAt(1) << 8) | (code.charCodeAt(2) << 16) | (code.charCodeAt(3) << 24)
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(4);
    writer.writeSInt32LE(this.toInt());
    return writer;
  }
}
