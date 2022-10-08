export abstract class UpdateSecurityCameraSystem {
  abstract getNumberOfPlayersUsing(): number;
}

export class UpdateSecurityCameraSystemData extends UpdateSecurityCameraSystem {
  constructor(
    protected readonly numberOfPlayersUsing: number,
  ) { super() }

  getNumberOfPlayersUsing(): number { return this.numberOfPlayersUsing }
}
