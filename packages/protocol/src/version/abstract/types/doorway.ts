import { BinaryWriter } from "@autil/helpers";

export abstract class Doorway {
  abstract isOpen(): boolean;
}

export class DoorwayData extends Doorway {
  constructor(protected readonly open: boolean) { super() }

  isOpen() { return this.open }
}
