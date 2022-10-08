import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { HelloContents } from "../../abstract/hazel/helloContents";
import { ClientVersion_V2018_11_14_0 } from "../types/clientVersion";

export class HelloData_V2018_11_14_0 extends HelloContents {
  static fromAbstract(data: HelloContents) {
    return new HelloData_V2018_11_14_0(
      ClientVersion_V2018_11_14_0.fromAbstract(data.getClientProtocolVersion()),
      data.getPlayerName(),
    );
  }

  static deserialize(reader: BinaryReader) {
    return new HelloData_V2018_11_14_0(
      reader.read(ClientVersion_V2018_11_14_0),
      reader.readString(reader.readPackedUInt32()),
    );
  }

  constructor(
    protected readonly version: ClientVersion_V2018_11_14_0,
    protected readonly name: string,
  ) { super() };

  getClientProtocolVersion() { return this.version }
  getPlayerName() { return this.name }

  serialize(): BinaryWriter {
    const writer = BinaryWriter.allocate(10 + this.getPlayerName().length);

    writer.write(this.getClientProtocolVersion());
    writer.writePackedUInt32(this.getPlayerName().length);
    writer.writeString(this.getPlayerName());

    return writer;
  }
}
