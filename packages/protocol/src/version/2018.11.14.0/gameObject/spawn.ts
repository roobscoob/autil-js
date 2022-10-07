// pre-imports

import "./update"

// used imports

import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { GameObjectSpawn } from "../../abstract/gameObject/spawn";
import { GameObject_V2018_11_14_0 } from "../rootPackets/gameObject";
import { SpawnShipStatus_V2018_11_14_0 } from "../spawn/shipStatus";
import { SpawnMeetingHud_V2018_11_14_0 } from "../spawn/meetingHud";
import { SpawnLobbyBehaviour_V2018_11_14_0 } from "../spawn/lobbyBehaviour";
import { SpawnGameData_V2018_11_14_0 } from "../spawn/gameData";
import { SpawnPlayerControl_V2018_11_14_0 } from "../spawn/playerControl";
import { MessageWriter } from "@autil/hazel";

export abstract class GameObjectSpawn_V2018_11_14_0 extends GameObject_V2018_11_14_0 implements GameObjectSpawn {
  static fromAbstract(data: GameObjectSpawn) {
    if (data.isSpawnGameData())
      return SpawnGameData_V2018_11_14_0.fromAbstract(data);

    if (data.isSpawnLobbyBehaviour())
      return SpawnLobbyBehaviour_V2018_11_14_0.fromAbstract(data);

    if (data.isSpawnMeetingHud())
      return SpawnMeetingHud_V2018_11_14_0.fromAbstract(data);

    if (data.isSpawnPlayerControl())
      return SpawnPlayerControl_V2018_11_14_0.fromAbstract(data);

    if (data.isSpawnShipStatus())
      return SpawnShipStatus_V2018_11_14_0.fromAbstract(data);

    throw new Error(`Unknown abstract spawn packet`);
  }

  static deserialize(reader: BinaryReader) {
    const kind = reader.readPackedUInt32();
    const ownerId = reader.readPackedInt32();
    const isClientCharacter = reader.readBoolean();
    const componentsLength = reader.readPackedInt32();
    const expectedComponentsLength = (kind === 4 ? 3 : 1);

    if (componentsLength !== expectedComponentsLength)
      throw new Error("Component count for " + kind + " was " + componentsLength + ". Expected " + expectedComponentsLength);

    switch(kind) {
      case 0: // InnerNetObject: SkeldShipStatus
        return SpawnShipStatus_V2018_11_14_0.deserializeComponents(reader, ownerId, isClientCharacter);
      case 1: // InnerNetObject: MeetingHud
        return SpawnMeetingHud_V2018_11_14_0.deserializeComponents(reader, ownerId, isClientCharacter);
      case 2: // InnerNetObject: LobbyBehaviour
        return SpawnLobbyBehaviour_V2018_11_14_0.deserializeComponents(reader, ownerId, isClientCharacter);
      case 3: // InnerNetObject: GameData
        return SpawnGameData_V2018_11_14_0.deserializeComponents(reader, ownerId, isClientCharacter);
      case 4: // InnerNetObject: PlayerControl
        return SpawnPlayerControl_V2018_11_14_0.deserializeComponents(reader, ownerId, isClientCharacter);

      default:
        throw new Error(`Unknown InnerNetObject kind ${kind}`)
    }
  }

  isSpawnShipStatus(): this is SpawnShipStatus_V2018_11_14_0 { return false }
  isSpawnMeetingHud(): this is SpawnMeetingHud_V2018_11_14_0 { return false }
  isSpawnLobbyBehaviour(): this is SpawnLobbyBehaviour_V2018_11_14_0 { return false }
  isSpawnGameData(): this is SpawnGameData_V2018_11_14_0 { return false }
  isSpawnPlayerControl(): this is SpawnPlayerControl_V2018_11_14_0 { return false }

  constructor(
    protected readonly ownerId: number,
    protected readonly _isClientCharacter: boolean,
  ) { super() }

  getOwnerId() { return this.ownerId }
  isClientCharacter() { return this._isClientCharacter }

  abstract serializeComponents(): BinaryWriter;
  abstract getComponentCount(): number;

  serialize(): MessageWriter {
    const components = this.serializeComponents().getBuffer();

    const writer = MessageWriter.allocateTagged(4, 8 + components.byteLength);

    writer.writePackedInt32(this.getOwnerId());
    writer.writeBoolean(this.isClientCharacter());
    writer.writePackedInt32(this.getComponentCount());
    writer.writeBytes(components);

    return writer;
  }
}
