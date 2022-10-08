import { GameObject } from "../../rootPackets/gameObject"
import { UpdateCustomNetworkTransformComponent } from "../../update/components/customNetworkTransform"
import { UpdateGameDataComponent } from "../../update/components/gameData"
import { UpdateLobbyBehaviourComponent } from "../../update/components/lobbyBehaviour"
import { UpdateMeetingHudComponent } from "../../update/components/meetingHud"
import { UpdatePlayerControlComponent } from "../../update/components/playerControl"
import { UpdatePlayerPhysicsComponent } from "../../update/components/playerPhysics"
import { UpdateShipStatusComponent } from "../../update/components/shipStatus"

type Possibilities = 
  UpdateGameDataComponent |
  UpdateMeetingHudComponent |
  UpdateShipStatusComponent |
  UpdatePlayerControlComponent | 
  UpdatePlayerPhysicsComponent |
  UpdateLobbyBehaviourComponent |
  UpdateCustomNetworkTransformComponent

export abstract class GameObjectAmbigousUpdate<T extends Possibilities[] = Possibilities[]> extends GameObject {
  isAmbigous(): this is GameObjectAmbigousUpdate { return true }

  abstract getNetId(): number;
  abstract getPossibilities(): T;

  abstract asGameData(): UpdateGameDataComponent | undefined;
  abstract asMeetingHud(): UpdateMeetingHudComponent | undefined;
  abstract asShipStatus(): UpdateShipStatusComponent | undefined;
  abstract asPlayerControl(): UpdatePlayerControlComponent | undefined;
  abstract asPlayerPhysics(): UpdatePlayerPhysicsComponent | undefined;
  abstract asLobbyBehaviour(): UpdateLobbyBehaviourComponent | undefined;
  abstract asCustomNetworkTransform(): UpdateCustomNetworkTransformComponent | undefined;
}
