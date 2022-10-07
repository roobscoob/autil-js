import { GameObjectSpawn } from "../gameObject/spawn";
import { SpawnCustomNetworkTransformComponent } from "./components/customNetworkTransform";
import { SpawnPlayerControlComponent } from "./components/playerControl";
import { SpawnPlayerPhysicsComponent } from "./components/playerPhysics";

export abstract class SpawnPlayerControl extends GameObjectSpawn {
  isSpawnPlayerControl(): this is SpawnPlayerControl {
    return true;
  }

  abstract getPlayerControlComponent(): SpawnPlayerControlComponent;
  abstract getPlayerPhysicsComponent(): SpawnPlayerPhysicsComponent;
  abstract getCustomNetworkTransformComponent(): SpawnCustomNetworkTransformComponent;
}

export class AbstactSpawnPlayerControl extends SpawnPlayerControl {
  constructor(
    protected readonly ownerId: number,
    protected readonly _isClientCharacter: boolean,
    protected readonly playerControl: SpawnPlayerControlComponent,
    protected readonly playerPhysics: SpawnPlayerPhysicsComponent,
    protected readonly customNetworkTransform: SpawnCustomNetworkTransformComponent,
  ) { super() }

  getOwnerId() { return this.ownerId }
  isClientCharacter() { return this._isClientCharacter }
  getPlayerControlComponent() { return this.playerControl }
  getPlayerPhysicsComponent() { return this.playerPhysics }
  getCustomNetworkTransformComponent() { return this.customNetworkTransform }
}
