import { GameObjectSpawn } from "../gameObject/spawn";
import { SpawnLobbyBehaviourComponent } from "./components/lobbyBehaviour";

export abstract class SpawnLobbyBehaviour extends GameObjectSpawn {
  isSpawnLobbyBehaviour(): this is SpawnLobbyBehaviour {
    return true;
  }

  abstract getLobbyBehaviourComponent(): SpawnLobbyBehaviourComponent;
}

export class AbstactSpawnLobbyBehaviour extends SpawnLobbyBehaviour {
  constructor(
    protected readonly ownerId: number,
    protected readonly _isClientCharacter: boolean,
    protected readonly lobbyBehaviour: SpawnLobbyBehaviourComponent,
  ) { super() }

  getOwnerId() { return this.ownerId }
  isClientCharacter() { return this._isClientCharacter }
  getLobbyBehaviourComponent() { return this.lobbyBehaviour }
}
