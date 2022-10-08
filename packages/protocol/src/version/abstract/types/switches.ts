export abstract class Switches {
  abstract getSwitch(index: number): boolean | undefined;
}

export class SwitchesData extends Switches {
  constructor(
    protected readonly switches: boolean[],
  ) { super() }

  getSwitch(index: number) { return this.switches[index] }
}
