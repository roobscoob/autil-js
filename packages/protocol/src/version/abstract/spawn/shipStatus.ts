import { GameObjectSpawn } from "../gameObject/spawn";
import { SpawnShipStatusComponent } from "./components/shipStatus";

export abstract class SpawnShipStatus extends GameObjectSpawn {
  isSpawnShipStatus(): this is SpawnShipStatus {
    return true;
  }

  abstract getShipStatusComponent(): SpawnShipStatusComponent;
}

export class SpawnShipStatusData extends SpawnShipStatus {
  constructor(
    protected readonly ownerId: number,
    protected readonly _isClientCharacter: boolean,
    protected readonly shipStatus: SpawnShipStatusComponent,
  ) { super() }

  getOwnerId() { return this.ownerId }
  isClientCharacter() { return this._isClientCharacter }
  getShipStatusComponent() { return this.shipStatus }
}
