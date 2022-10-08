import { Doorway } from "../../types/doorway";

export abstract class SpawnDoorsSystem {
  abstract getDoorways(): Doorway[];
}

export class SpawnDoorsSystemData extends SpawnDoorsSystem {
  constructor(
    protected readonly doorways: Doorway[],
  ) { super() }

  getDoorways() { return this.doorways }
}
