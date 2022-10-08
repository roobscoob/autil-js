import { GameObjectUpdate } from "../../gameObject/update";
import { PlayerVoteArea } from "../../types/playerVoteArea";

export abstract class UpdateMeetingHudComponent extends GameObjectUpdate {
  abstract getPlayerVoteArea(index: number): PlayerVoteArea | undefined;

  isUpdateMeetingHud(): this is UpdateMeetingHudComponent {
    return true;
  }
}

export class UpdateMeetingHudComponentData extends UpdateMeetingHudComponent {
  constructor(
    protected readonly netId: number,
    protected readonly playerStates: (PlayerVoteArea | undefined)[],
  ) { super() }

  getNetId() { return this.netId }
  getPlayerVoteArea(index: number) { return this.playerStates[index] }
}
