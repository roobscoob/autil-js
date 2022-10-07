import { SpawnComponent } from ".";
import { PlayerVoteArea } from "../../types/playerVoteArea";

export abstract class SpawnMeetingHudComponent extends SpawnComponent {
  isMeetingHud(): this is SpawnMeetingHudComponent {
    return true;
  }

  abstract getPlayerVoteAreas(): PlayerVoteArea[];
}

export class SpawnMeetingHudComponentData extends SpawnMeetingHudComponent {
  constructor(
    protected readonly netId: number,
    protected readonly playerStates: PlayerVoteArea[],
  ) { super() }

  getNetId() { return this.netId }
  getPlayerVoteAreas() { return this.playerStates }
}
