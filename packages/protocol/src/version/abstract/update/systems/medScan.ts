import { Doorway } from "../../types/doorway";

export abstract class UpdateMedScanSystem {
  abstract getCurrentPlayerId(): number | undefined;
}

export class UpdateMedScanSystemData extends UpdateMedScanSystem {
  constructor(
    protected readonly currentUser: number | undefined,
  ) { super() }

  getCurrentPlayerId() { return this.currentUser }
}
