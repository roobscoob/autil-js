import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";
import { ClientVersion } from "../../abstract/types/clientVersion";

export class ClientVersion_V2018_11_14_0 extends ClientVersion implements BinaryObjectInstance {
  static fromAbstract(data: ClientVersion) {
    return new ClientVersion_V2018_11_14_0(
      data.getYear(),
      data.getMonth(),
      data.getDay(),
      data.getRevision(),
    )
  }

  static deserialize(reader: BinaryReader) {
    return this.fromInt(reader.readSInt32LE());
  }

  static fromInt(version: number): ClientVersion_V2018_11_14_0 {
    const year = version / 25000;
    version %= 25000;

    const month = version / 1800;
    version %= 1800;

    const day = version / 50;
    const revision = version % 50;

    return new ClientVersion_V2018_11_14_0(year, month, day, revision);
  }

  constructor(
    protected readonly year: number,
    protected readonly month: number,
    protected readonly day: number,
    protected readonly revision: number
  ) {
    super();
  }

  getYear(): number { return this.year }
  getMonth(): number { return this.month }
  getDay(): number { return this.day }
  getRevision(): number { return this.revision }

  toInt(): number {
    return (this.getYear() * 25000) + (this.getMonth() * 1800) + (this.getDay() * 50) + this.getRevision();
  }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(4);
    writer.writeSInt32LE(this.toInt());
    return writer;
  }
}
