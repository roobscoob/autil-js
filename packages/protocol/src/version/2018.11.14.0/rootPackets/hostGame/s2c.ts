import { MessageReader, MessageWriter } from "@autil/hazel";
import { HostGameS2C } from "../../../abstract/rootPackets/hostGame";
import { ClientVersion } from "../../../abstract/types/clientVersion";
import { ClientVersion_V2018_11_14_0 } from "../../types/clientVersion";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";

export class HostGameS2CPacket_V2018_11_14_0 extends HostGameS2C {
  static fromAbstrasct(data: HostGameS2C) {
    return new HostGameS2CPacket_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
    )
  }

  static tryDeserialize(reader: MessageReader) {
    if (reader.countRemainingBytes() !== 4)
      return undefined;

    try {
      return this.deserialize(reader);
    } catch(err) {
      return undefined;
    }
  }

  static deserialize(reader: MessageReader): HostGameS2CPacket_V2018_11_14_0 {
    return new HostGameS2CPacket_V2018_11_14_0(
      reader.read(GameCode_V2018_11_14_0),
    )
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0
  ) { super() }

  getGameCode(): GameCode_V2018_11_14_0 {
    return this.gameCode;
  }

  serialize(): MessageWriter {
    return MessageWriter.fromTagged(RootPacketTags_V2018_11_14_0.HostGame, this.gameCode.serialize().getBuffer())
  }
}
