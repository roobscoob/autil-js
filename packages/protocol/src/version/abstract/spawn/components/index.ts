import { SpawnCustomNetworkTransformComponent } from "./customNetworkTransform";
import { SpawnGameDataComponent } from "./gameData";
import { SpawnLobbyBehaviourComponent } from "./lobbyBehaviour";
import { SpawnMeetingHudComponent } from "./meetingHud";
import { SpawnPlayerControlComponent } from "./playerControl";
import { SpawnPlayerPhysicsComponent } from "./playerPhysics";
import { SpawnShipStatusComponent } from "./shipStatus";

export abstract class SpawnComponent {
  isCustomNetworkTransform(): this is SpawnCustomNetworkTransformComponent { return false };
  isGameData(): this is SpawnGameDataComponent { return false };
  isLobbyBehaviour(): this is SpawnLobbyBehaviourComponent { return false };
  isMeetingHud(): this is SpawnMeetingHudComponent { return false };
  isPlayerControl(): this is SpawnPlayerControlComponent { return false };
  isPlayerPhysics(): this is SpawnPlayerPhysicsComponent { return false };
  isShipStatus(): this is SpawnShipStatusComponent { return false };

  abstract getNetId(): number;
}
