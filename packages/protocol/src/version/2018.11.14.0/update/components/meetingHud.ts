import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateMeetingHudComponent } from "../../../abstract/update/components/meetingHud";
import { GameObjectUpdate_V2018_11_14_0 } from "../../gameObject/update";
import { PlayerVoteArea_V2018_11_14_0 } from "../../types/playerVoteArea";

export class UpdateMeetingHudComponent_V2018_11_14_0 extends GameObjectUpdate_V2018_11_14_0 implements UpdateMeetingHudComponent {
  static fromAbstract(data: UpdateMeetingHudComponent) {
    return new UpdateMeetingHudComponent_V2018_11_14_0(
      data.getNetId(),
      new Array(32).fill(0).map((_, i) => {
        const v = data.getPlayerVoteArea(i);

        if (v) return PlayerVoteArea_V2018_11_14_0.fromAbstract(v)

        return undefined
      }),
    )
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const dirtyBits = reader.readPackedUInt32();

    let playerStates: (PlayerVoteArea_V2018_11_14_0 | undefined)[] = []

    for (let i = 0; i < 32; i++) {
      if (dirtyBits & (1 << i)) {
        playerStates[i] = reader.read(PlayerVoteArea_V2018_11_14_0)
      }
    }

    return new UpdateMeetingHudComponent_V2018_11_14_0(netId, playerStates);
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    try {
      const v = this.deserializeContents(reader, netId);

      if (reader.hasBytesLeftToRead())
        return undefined;

      return v;
    } catch(err) {
      return undefined;
    }
  }

  constructor(
    netId: number,
    protected readonly voteAreas: (PlayerVoteArea_V2018_11_14_0 | undefined)[],
  ) { super(netId) }

  isUpdateMeetingHud(): this is UpdateMeetingHudComponent {
    return true;
  }

  getPlayerVoteArea(index: number) { return this.voteAreas[index] }

  serializeContents(): MessageWriter {
    const serializedVoteAreas = this.voteAreas.filter(e => e).map(v => v!.serialize().getBuffer());

    let dirtyBits = 0;

    for (let i = 0; i < 32; i++) {
      if (this.getPlayerVoteArea(i) !== undefined)
        dirtyBits |= (1 << i)
    }

    const message = MessageWriter.allocate(6 + serializedVoteAreas.reduce((p, c) => p + c.byteLength, 0))

    message.writePackedUInt32(dirtyBits);

    for (const serializedVoteArea of serializedVoteAreas) {
      message.writeBytes(serializedVoteArea);
    }

    return message;
  }
}
