import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnMeetingHud } from "../../abstract/spawn/meetingHud";
import { GameObjectSpawn_V2018_11_14_0 } from "../gameObject/spawn";
import { RootPacketTags_V2018_11_14_0 } from "../tags";
import { SpawnComponent_V2018_11_14_0 } from "./components";
import { SpawnMeetingHudComponent_V2018_11_14_0 } from "./components/meetingHud";

export class SpawnMeetingHud_V2018_11_14_0 extends GameObjectSpawn_V2018_11_14_0 implements SpawnMeetingHud {
  static fromAbstract(data: SpawnMeetingHud) {
    return new SpawnMeetingHud_V2018_11_14_0(
      data.getOwnerId(),
      data.isClientCharacter(),
      SpawnMeetingHudComponent_V2018_11_14_0.fromAbstract(data.getMeetingHudComponent()),
    )
  }

  static deserializeComponents(reader: BinaryReader, ownerId: number, isClientCharacter: boolean) {
    return new SpawnMeetingHud_V2018_11_14_0(
      ownerId,
      isClientCharacter,
      SpawnComponent_V2018_11_14_0.deserialize(reader, SpawnMeetingHudComponent_V2018_11_14_0),
    )
  }

  constructor(
    ownerId: number,
    isClientCharacter: boolean,
    protected readonly meetingHud: SpawnMeetingHudComponent_V2018_11_14_0,
  ) { super(ownerId, isClientCharacter) }

  isSpawnMeetingHud(): this is SpawnMeetingHud_V2018_11_14_0 {
    return true;
  }

  getMeetingHudComponent() { return this.meetingHud }

  getComponentCount() { return 1 }

  serializeComponents(): BinaryWriter {
    return this.getMeetingHudComponent().serialize();
  }
}
