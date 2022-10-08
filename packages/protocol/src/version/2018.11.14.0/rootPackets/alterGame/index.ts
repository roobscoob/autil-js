import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { AlterGame, AlterGamePrivacy } from "../../../abstract/rootPackets/alterGame";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";

export abstract class AlterGame_V2018_11_14_0 extends AlterGame {
  static fromAbstract(data: AlterGame) {
    if (data.isAlterGamePrivacy()) {
      return AlterGamePrivacy_V2018_11_14_0.fromAbstract(data);
    }

    throw new Error("Unknown Alter Game Packet")
  }

  static deserialize(reader: BinaryReader) {
    const gameCode = reader.read(GameCode_V2018_11_14_0);
    const tag = reader.readUInt8();

    switch (tag) {
      case 1: //AlterGameTag: Publicity
        return reader.read(AlterGamePrivacy_V2018_11_14_0.deserializeFromTag, gameCode);

      default:
        throw new Error(`Unknown AlterGame tag: ${tag}`)
    }
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
  ) { super() }

  getGameCode() { return this.gameCode }
}

export class AlterGamePrivacy_V2018_11_14_0 extends AlterGame_V2018_11_14_0 implements AlterGamePrivacy {
  static fromAbstract(data: AlterGamePrivacy) {
    return new AlterGamePrivacy_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
      data.getPublicity(),
    )
  }

  static deserialize(reader: BinaryReader) {
    const gameCode = reader.read(GameCode_V2018_11_14_0);
    const tag = reader.readUInt8();

    if (tag != 1)
      throw new Error("Expected tag 1 for AlterGamePublicity. Found: " + tag);

    return reader.read(this.deserializeFromTag, gameCode);
  }

  static deserializeFromTag(reader: BinaryReader, gameCode: GameCode_V2018_11_14_0) {
    return new AlterGamePrivacy_V2018_11_14_0(gameCode, reader.readBoolean());
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
    protected readonly publicity: boolean,
  ) { super(gameCode) }

  isAlterGamePrivacy() { return true }
  getPublicity() { return this.publicity }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.AlterGame, 6);

    writer.write(this.gameCode);
    writer.writeUInt8(1) // AlterGameTag: Publicity
    writer.writeBoolean(this.getPublicity());

    return writer;
  }
}
