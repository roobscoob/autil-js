import { GameObject } from "../rootPackets/gameObject";
import type { UpdateCustomNetworkTransformComponent } from "../update/components/customNetworkTransform";
import type { UpdateGameDataComponent } from "../update/components/gameData";
import type { UpdateLobbyBehaviourComponent } from "../update/components/lobbyBehaviour";
import type { UpdateMeetingHudComponent } from "../update/components/meetingHud";
import type { UpdatePlayerControlComponent } from "../update/components/playerControl";
import type { UpdatePlayerPhysicsComponent } from "../update/components/playerPhysics";
import type { UpdateShipStatusComponent } from "../update/components/shipStatus";
import type { GameObjectAmbigousUpdate } from "./ambigous/update";

export abstract class GameObjectUpdate extends GameObject {
  isUpdate(): this is GameObjectUpdate { return true }
  isAmbigous(): this is GameObjectAmbigousUpdate { return false }

  isUpdateShipStatus(): this is UpdateShipStatusComponent { return false }
  isUpdateGameData(): this is UpdateGameDataComponent { return false }
  isUpdateLobbyBehaviour(): this is UpdateLobbyBehaviourComponent { return false }
  isUpdateMeetingHud(): this is UpdateMeetingHudComponent { return false }
  isUpdatePlayerControl(): this is UpdatePlayerControlComponent { return false }
  isUpdatePlayerPhysics(): this is UpdatePlayerPhysicsComponent { return false }
  isUpdateCustomNetworkTransform(): this is UpdateCustomNetworkTransformComponent { return false }

  abstract getNetId(): number;
}
