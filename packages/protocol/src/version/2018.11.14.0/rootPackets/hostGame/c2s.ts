import { MessageReader, MessageWriter } from "@autil/hazel";
import { HostGameC2S } from "../../../abstract/rootPackets/hostGame";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";

export class HostGameC2SPacket_V2018_11_14_0 extends HostGameC2S {
  static fromAbstract(data: HostGameC2S) {
    return new HostGameC2SPacket_V2018_11_14_0();
  }

  static tryDeserialize(reader: MessageReader) {
    if (reader.countRemainingBytes() !== 0)
      return undefined;

    return new HostGameC2SPacket_V2018_11_14_0();
  }

  static desrialize(reader: MessageReader) {
    return new HostGameC2SPacket_V2018_11_14_0();
  }

  constructor() { super() }

  serialize(): MessageWriter {
    return MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.HostGame, 0);
  }
}
