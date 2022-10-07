import { Doorway } from "../../types/doorway";

export abstract class SpawnMedScanSystem {
  abstract getCurrentPlayerId(): number | undefined;
}

export class SpawnMedScanSystemData extends SpawnMedScanSystem {
  constructor(
    protected readonly currentUser: number | undefined,
  ) { super() }

  getCurrentPlayerId() { return this.currentUser }
}
