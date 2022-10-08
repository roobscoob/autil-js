import { Doorway } from "../../types/doorway";

export abstract class UpdateDoorsSystem {
  abstract getDoorway(index: number): Doorway | undefined;
}

export class UpdateDoorsSystemData extends UpdateDoorsSystem {
  constructor(
    protected readonly doorways: (Doorway | undefined)[],
  ) { super() }

  getDoorway(index: number) { return this.doorways[index] }
}
