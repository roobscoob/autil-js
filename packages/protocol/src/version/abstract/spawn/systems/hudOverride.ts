import { Doorway } from "../../types/doorway";

export abstract class SpawnHudOverrideSystem {
  abstract isActive(): boolean;
}

export class SpawnHudOverrideSystemData extends SpawnHudOverrideSystem {
  constructor(
    protected readonly active: boolean,
  ) { super() }

  isActive() { return this.active }
}
