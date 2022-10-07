import { Doorway } from "../../types/doorway";

export abstract class UpdateHudOverrideSystem {
  abstract isActive(): boolean;
}

export class UpdateHudOverrideSystemData extends UpdateHudOverrideSystem {
  constructor(
    protected readonly active: boolean,
  ) { super() }

  isActive() { return this.active }
}
