import { MessageWriter } from "@autil/hazel";
import { GameObjectAmbigousUpdate } from "../../../abstract/gameObject/ambigous/update";
import { GameObjectUpdate } from "../../../abstract/gameObject/update";
import { GameObject_V2018_11_14_0 } from "../../rootPackets/gameObject";
import { UpdateCustomNetworkTransformComponent_V2018_11_14_0 } from "../../update/components/customNetworkTransform";
import { UpdateGameDataComponent_V2018_11_14_0 } from "../../update/components/gameData";
import { UpdateLobbyBehaviourComponent_V2018_11_14_0 } from "../../update/components/lobbyBehaviour";
import { UpdateMeetingHudComponent_V2018_11_14_0 } from "../../update/components/meetingHud";
import { UpdatePlayerControlComponent_V2018_11_14_0 } from "../../update/components/playerControl";
import { UpdatePlayerPhysicsComponent_V2018_11_14_0 } from "../../update/components/playerPhysics";
import { UpdateShipStatusComponent_V2018_11_14_0 } from "../../update/components/shipStatus";
import { GameObjectUpdate_V2018_11_14_0 } from "../update";

type Possibilities =
  UpdateGameDataComponent_V2018_11_14_0 |
  UpdateMeetingHudComponent_V2018_11_14_0 |
  UpdateShipStatusComponent_V2018_11_14_0 |
  UpdatePlayerControlComponent_V2018_11_14_0 |
  UpdatePlayerPhysicsComponent_V2018_11_14_0 |
  UpdateLobbyBehaviourComponent_V2018_11_14_0 |
  UpdateCustomNetworkTransformComponent_V2018_11_14_0

export class GameObjectAmbigousUpdate_V2018_11_14_0<T extends Possibilities[] = Possibilities[]> extends GameObject_V2018_11_14_0 implements GameObjectAmbigousUpdate<T> {
  static fromAbstract(data: GameObjectAmbigousUpdate): GameObjectAmbigousUpdate_V2018_11_14_0 {
    return new GameObjectAmbigousUpdate_V2018_11_14_0(
      data.getNetId(),
      data.getPossibilities().map(p => GameObjectUpdate_V2018_11_14_0.fromAbstract(p) as any).filter(v => !(v instanceof GameObjectAmbigousUpdate_V2018_11_14_0)),
    )
  }

  static fromChocies<T extends Possibilities[]>(netId: number, ...choices: T): GameObjectAmbigousUpdate_V2018_11_14_0<T> {
    return new GameObjectAmbigousUpdate_V2018_11_14_0(netId, choices);
  }

  constructor(
    protected readonly netId: number,
    protected readonly choices: T,
  ) { super() }

  isAmbigous(): this is GameObjectAmbigousUpdate { return true }

  getNetId() { return this.netId }
  getPossibilities() { return this.choices }

  asGameData() { return this.getPossibilities().find(p => p instanceof UpdateGameDataComponent_V2018_11_14_0) as UpdateGameDataComponent_V2018_11_14_0 | undefined }
  asMeetingHud() { return this.getPossibilities().find(p => p instanceof UpdateMeetingHudComponent_V2018_11_14_0) as UpdateMeetingHudComponent_V2018_11_14_0 | undefined }
  asShipStatus() { return this.getPossibilities().find(p => p instanceof UpdateShipStatusComponent_V2018_11_14_0) as UpdateShipStatusComponent_V2018_11_14_0 | undefined }
  asPlayerControl() { return this.getPossibilities().find(p => p instanceof UpdatePlayerControlComponent_V2018_11_14_0) as UpdatePlayerControlComponent_V2018_11_14_0 | undefined }
  asPlayerPhysics() { return this.getPossibilities().find(p => p instanceof UpdatePlayerPhysicsComponent_V2018_11_14_0) as UpdatePlayerPhysicsComponent_V2018_11_14_0 | undefined }
  asLobbyBehaviour() { return this.getPossibilities().find(p => p instanceof UpdateLobbyBehaviourComponent_V2018_11_14_0) as UpdateLobbyBehaviourComponent_V2018_11_14_0 | undefined }
  asCustomNetworkTransform() { return this.getPossibilities().find(p => p instanceof UpdateCustomNetworkTransformComponent_V2018_11_14_0) as UpdateCustomNetworkTransformComponent_V2018_11_14_0 | undefined }

  serialize(): MessageWriter {
    throw new Error("Cannot serialize ambigous updates");
  }
}
