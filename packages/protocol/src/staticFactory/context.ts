export abstract class SocketContext {
  abstract getGameObject(netId: number): GameObjectContext | undefined;
}

export class EmptySocketContext extends SocketContext {
  getGameObject(netId: number) { return undefined }
}

export abstract class GameObjectContext {
  isShipStatus(): this is ShipStatusContext { return false }
  isGameData(): this is GameDataContext { return false }
  isLobbyBehaviour(): this is LobbyBehaviourContext { return false }
  isPlayerControl(): this is PlayerControlContext { return false }
  isPlayerPhysics(): this is PlayerPhysicsContext { return false }
  isCustomNetworkTransform(): this is CustomNetworkTransformContext { return false }
  isMeetingHud(): this is MeetingHudContext { return false }
}

export abstract class ShipStatusContext extends GameObjectContext {
  isShipStatus(): this is ShipStatusContext { return true }
}

export abstract class GameDataContext extends GameObjectContext {
  isGameData(): this is GameDataContext { return true}
}

export abstract class LobbyBehaviourContext extends GameObjectContext {
  isLobbyBehaviour(): this is LobbyBehaviourContext { return true }
}

export abstract class PlayerControlContext extends GameObjectContext {
  isPlayerControl(): this is PlayerControlContext { return true }
}

export abstract class MeetingHudContext extends GameObjectContext {
  isMeetingHud(): this is MeetingHudContext { return true }
}

export abstract class PlayerPhysicsContext extends GameObjectContext {
  isPlayerPhysics(): this is PlayerPhysicsContext { return true }
}

export abstract class CustomNetworkTransformContext extends GameObjectContext {
  isCustomNetworkTransform(): this is CustomNetworkTransformContext { return true }
}

