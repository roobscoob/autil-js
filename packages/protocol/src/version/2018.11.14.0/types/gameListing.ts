import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { GameListing } from "../../abstract/types/gameListing";
import { GameCode_V2018_11_14_0 } from "./gameCode";

export class GameListing_V2018_11_14_0 extends GameListing {
  static fromAbstract(data: GameListing) {
    return new GameListing_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
      data.getPlayerCount(),
      data.getAge(),
      data.getHostName()
    )
  }

  static deserialize(reader: BinaryReader) {
    return new GameListing_V2018_11_14_0(
      reader.read(GameCode_V2018_11_14_0),
      reader.readPackedInt32(),
      reader.readPackedInt32(),
      reader.readString(reader.readPackedInt32()),
    );
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
    protected readonly playerCount: number,
    protected readonly age: number,
    protected readonly hostName: string,
  ) { super() }

  getGameCode() { return this.gameCode }
  getPlayerCount() { return this.playerCount }
  getAge() { return this.age }
  getHostName() { return this.hostName }

  serialize(): BinaryWriter {
    const alloc = BinaryWriter.allocate(4 + 6 + 6 + 6 + this.getHostName().length);

    alloc.write(this.getGameCode());
    alloc.writePackedInt32(this.playerCount);
    alloc.writePackedInt32(this.age);
    alloc.writePackedInt32(this.getHostName().length);
    alloc.writeString(this.getHostName());

    return alloc;
  }
}
