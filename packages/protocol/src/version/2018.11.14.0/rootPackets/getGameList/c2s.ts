import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { GetGameListC2S } from "../../../abstract/rootPackets/getGameList";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";

export class GetGameListC2S_V2018_11_14_0 extends GetGameListC2S {
  static fromAbstract(data: GetGameListC2S) {
    return new GetGameListC2S_V2018_11_14_0(
      data.getIncludePrivate(),
    )
  }

  static computeLength() { return 1 }

  static tryDeserialize(reader: BinaryReader) {
    if (reader.countRemainingBytes() !== this.computeLength())
      return undefined;

    try {
      return this.deserialize(reader);
    } catch(err) {
      return undefined;
    }
  }

  static deserialize(reader: BinaryReader) {
    return new GetGameListC2S_V2018_11_14_0(
      reader.readBoolean(),
    )
  }

  constructor(
    protected readonly includePrivate: boolean,
  ) { super() }

  getIncludePrivate() { return this.includePrivate }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.GetGameList, 1);

    writer.writeBoolean(this.includePrivate);

    return writer;
  }
}
