import type { GameObjectDespawn } from "../gameObject/despawn";
import type { GameObjectRpc } from "../gameObject/rpc";
import type { GameObjectSceneChange } from "../gameObject/sceneChange";
import type { GameObjectSpawn } from "../gameObject/spawn";
import type { GameObjectUpdate } from "../gameObject/update";
import { GameCode } from "../types/gameCode";
import { BaseRootPacket } from "./base";

export abstract class GameObject {
  isUpdate(): this is GameObjectUpdate { return false }
  isRpc(): this is GameObjectRpc { return false }
  isSpawn(): this is GameObjectSpawn { return false }
  isDespawn(): this is GameObjectDespawn { return false }
  isSceneChange(): this is GameObjectSceneChange { return false }

  
}

export abstract class GameObjectSet extends BaseRootPacket {
  abstract getGameCode(): GameCode;
  abstract getRecipientClientId(): number | undefined;
  abstract getObjects(): GameObject[];

  isGameObjectSet(): this is GameObjectSet {
    return true;
  }
}

export class GameObjectSetData extends GameObjectSet {
  protected readonly objects: GameObject[];
  protected readonly recipientClientId: number | undefined;

  constructor(
    gameCode: GameCode,
    recipientClientId: number | undefined,
    ...objects: GameObject[] 
  )
  constructor(
    gameCode: GameCode,
    ...objects: GameObject[]
  )
  constructor(
    protected readonly gameCode: GameCode,
    recipientClientIdOrFirstObject: number | undefined | GameObject,
    ...objects: GameObject[]
  ) {
    super()

    if (recipientClientIdOrFirstObject instanceof GameObject) {
      this.objects = [recipientClientIdOrFirstObject, ...objects];
      this.recipientClientId = undefined;
    } else {
      this.objects = objects;
      this.recipientClientId = recipientClientIdOrFirstObject;
    }
  }

  getGameCode() { return this.gameCode }
  getRecipientClientId() { return this.recipientClientId }
  getObjects() { return this.objects }
}
