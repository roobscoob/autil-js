import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { PlayerVoteArea } from "../../abstract/types/playerVoteArea";
import { GameCode_V2018_11_14_0 } from "./gameCode";

export class PlayerVoteArea_V2018_11_14_0 extends PlayerVoteArea {
  static fromAbstract(data: PlayerVoteArea) {
    return new PlayerVoteArea_V2018_11_14_0(
      data.getVotedFor(),
      data.isDead(),
      data.didVote(),
      data.didReport(),
    )
  }

  static deserialize(reader: BinaryReader) {
    const byte = reader.readUInt8();
    const bottomNibble = (byte & 0x0F);

    return new PlayerVoteArea_V2018_11_14_0(
      bottomNibble === 0 ? undefined : bottomNibble - 1,
      (byte & 0b1000_0000) === 1,
      (byte & 0b0100_0000) === 1,
      (byte & 0b0010_0000) === 1,
    );
  }

  constructor(
    protected readonly votedFor: number | undefined,
    protected readonly dead: boolean,
    protected readonly voted: boolean,
    protected readonly reported: boolean,
  ) { super() }

  getVotedFor() { return this.votedFor }
  isDead() { return this.dead }
  didVote() { return this.voted }
  didReport() { return this.reported }

  serialize(): BinaryWriter {
    const alloc = BinaryWriter.allocate(1);

    let b = 0;

    b |= ((this.getVotedFor() ?? -1) + 1) & 0x0F;

    if (this.isDead()) b |= 0b1000_0000;
    if (this.didVote()) b |= 0b0100_0000;
    if (this.didReport()) b |= 0b0010_0000;

    return alloc;
  }
}
