import { BinaryObjectInstance, BinaryReader, BinaryWriter } from "@autil/helpers";

export class Random implements BinaryObjectInstance {
  static NULL = new Random(0, new ArrayBuffer(28));

  static generate() {
    const time = (Date.now() / 1000) - ((new Date()).getTimezoneOffset() * 60);
    const randArrNum = new Array(28).fill(0).map(e => Math.floor(Math.random() * 256));
    const rand = new Uint8Array(randArrNum).buffer;

    return new Random(time, rand);
  }

  static deserialize(reader: BinaryReader) {
    const time = reader.readUInt32BE();
    const rand = reader.readBytes(28).getBuffer().buffer;

    return new Random(time, rand);
  }

  constructor(protected readonly time: number, protected readonly randBytes: ArrayBuffer) {}

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(32);

    writer.writeUInt32BE(this.time);
    writer.writeBytes(this.randBytes);

    return writer;
  }
}
