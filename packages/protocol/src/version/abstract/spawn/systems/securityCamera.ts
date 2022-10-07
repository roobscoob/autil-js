export abstract class SpawnSecurityCameraSystem {
  abstract getNumberOfPlayersUsing(): number;
}

export class SpawnSecurityCameraSystemData extends SpawnSecurityCameraSystem {
  constructor(
    protected readonly numberOfPlayersUsing: number,
  ) { super() }

  getNumberOfPlayersUsing(): number { return this.numberOfPlayersUsing }
}
