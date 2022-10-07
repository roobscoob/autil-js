import { Doorway } from "../../types/doorway";

export abstract class UpdateReactorSystem {
  abstract getCountdown(): number | undefined;
}

export class UpdateReactorSystemData extends UpdateReactorSystem {
  constructor(
    protected readonly countdown: number | undefined,
  ) { super() }

  getCountdown() { return this.countdown }
}
