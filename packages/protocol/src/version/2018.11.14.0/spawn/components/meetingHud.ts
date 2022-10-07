import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnComponent_V2018_11_14_0 } from ".";
import { SpawnMeetingHudComponent } from "../../../abstract/spawn/components/meetingHud";
import { PlayerVoteArea_V2018_11_14_0 } from "../../types/playerVoteArea";

export class SpawnMeetingHudComponent_V2018_11_14_0 extends SpawnComponent_V2018_11_14_0 implements SpawnMeetingHudComponent {
  static fromAbstract(data: SpawnMeetingHudComponent) {
    return new SpawnMeetingHudComponent_V2018_11_14_0(
      data.getNetId(),
      data.getPlayerVoteAreas().map(v => PlayerVoteArea_V2018_11_14_0.fromAbstract(v)),
    )
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new SpawnMeetingHudComponent_V2018_11_14_0(netId, [...reader.readRemaining(r => r.read(PlayerVoteArea_V2018_11_14_0))]);
  }

  constructor(
    netId: number,
    protected readonly voteAreas: PlayerVoteArea_V2018_11_14_0[],
  ) { super(netId) }

  isMeetingHud(): this is SpawnMeetingHudComponent {
    return true;
  }

  getPlayerVoteAreas() { return this.voteAreas }

  serializeContents(): MessageWriter {
    const serializedVoteAreas = this.getPlayerVoteAreas().map(v => v.serialize().getBuffer());

    const message = MessageWriter.allocate(serializedVoteAreas.reduce((p, c) => p + c.byteLength, 0))

    for (const serializedVoteArea of serializedVoteAreas) {
      message.writeBytes(serializedVoteArea);
    }

    return message;
  }
}
