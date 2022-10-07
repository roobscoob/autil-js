import { GameObject } from "../rootPackets/gameObject";
import { SpawnGameData } from "../spawn/gameData";
import { SpawnLobbyBehaviour } from "../spawn/lobbyBehaviour";
import { SpawnMeetingHud } from "../spawn/meetingHud";
import { SpawnPlayerControl } from "../spawn/playerControl";
import { SpawnShipStatus } from "../spawn/shipStatus";

export abstract class GameObjectSpawn extends GameObject {
  isSpawn(): this is GameObjectSpawn { return true }

  abstract getOwnerId(): number;
  abstract isClientCharacter(): boolean;

  isSpawnGameData(): this is SpawnGameData { return false };
  isSpawnLobbyBehaviour(): this is SpawnLobbyBehaviour { return false };
  isSpawnMeetingHud(): this is SpawnMeetingHud { return false };
  isSpawnPlayerControl(): this is SpawnPlayerControl { return false };
  isSpawnShipStatus(): this is SpawnShipStatus { return false };
}
