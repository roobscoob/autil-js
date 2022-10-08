import { GameObjectSpawn } from "../gameObject/spawn";
import { SpawnMeetingHudComponent } from "./components/meetingHud";

export abstract class SpawnMeetingHud extends GameObjectSpawn {
  isSpawnMeetingHud(): this is SpawnMeetingHud {
    return true;
  }

  abstract getMeetingHudComponent(): SpawnMeetingHudComponent;
}

export class AbstactSpawnMeetingHud extends SpawnMeetingHud {
  constructor(
    protected readonly ownerId: number,
    protected readonly _isClientCharacter: boolean,
    protected readonly meetingHud: SpawnMeetingHudComponent,
  ) { super() }

  getOwnerId() { return this.ownerId }
  isClientCharacter() { return this._isClientCharacter }
  getMeetingHudComponent() { return this.meetingHud }
}
