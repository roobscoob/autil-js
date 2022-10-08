import { Doorway } from "../../types/doorway";

export abstract class SpawnReactorSystem {
  abstract getCountdown(): number | undefined;
}

export class SpawnReactorSystemData extends SpawnReactorSystem {
  constructor(
    protected readonly countdown: number | undefined,
  ) { super() }

  getCountdown() { return this.countdown }
}
