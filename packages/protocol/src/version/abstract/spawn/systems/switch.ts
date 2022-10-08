import { Switches } from "../../types/switches"

export abstract class SpawnSwitchSystem {
  abstract getExpectedSwitches(): Switches;
  abstract getActualSwitches(): Switches;
  abstract getLightRadius(): number;
}

export class SpawnSwitchSystemData extends SpawnSwitchSystem {
  constructor(
    protected readonly expectedSwitches: Switches,
    protected readonly actualSwitches: Switches,
    protected readonly lightRadius: number,
  ) { super() }

  getExpectedSwitches() { return this.expectedSwitches }
  getActualSwitches() { return this.actualSwitches }
  getLightRadius() { return this.lightRadius }
}
