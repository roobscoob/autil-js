import { BinaryWriter } from "@autil/helpers";

export abstract class ClientVersion {
  abstract getYear(): number;
  abstract getMonth(): number;
  abstract getDay(): number;
  abstract getRevision(): number;

  toString() { return `${this.getYear()}.${this.getMonth()}.${this.getDay()}.${this.getRevision()}` }
}

export class ClientVersionData extends ClientVersion {
  constructor (
    protected readonly year: number,
    protected readonly month: number,
    protected readonly day: number,
    protected readonly revision: number
  ) { super() }

  getYear() { return this.year }
  getMonth() { return this.month }
  getDay() { return this.day }
  getRevision() { return this.revision }
}
