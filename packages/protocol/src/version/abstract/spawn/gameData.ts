import { GameObjectSpawn } from "../gameObject/spawn";
import { SpawnGameDataComponent } from "./components/gameData";

export abstract class SpawnGameData extends GameObjectSpawn {
  isSpawnGameData(): this is SpawnGameData { return true }

  abstract getGameDataComponent(): SpawnGameDataComponent;
}

export class AbstactSpawnGameData extends SpawnGameData {
  constructor(
    protected readonly ownerId: number,
    protected readonly _isClientCharacter: boolean,
    protected readonly gameData: SpawnGameDataComponent,
  ) { super() }

  getOwnerId() { return this.ownerId }
  isClientCharacter() { return this._isClientCharacter }
  getGameDataComponent() { return this.gameData }
}
