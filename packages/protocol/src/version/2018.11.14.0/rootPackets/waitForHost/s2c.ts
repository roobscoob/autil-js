import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { WaitForHostS2C } from "../../../abstract/rootPackets/waitForHost";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";

export class WaitForHostS2C_V2018_11_14_0 extends WaitForHostS2C {
  static fromAbstract(data: WaitForHostS2C) {
    return new WaitForHostS2C_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
      data.getRejoiningClientId(),
    )
  }

  static deserialize(reader: BinaryReader): WaitForHostS2C_V2018_11_14_0 {
    return new WaitForHostS2C_V2018_11_14_0(
      reader.read(GameCode_V2018_11_14_0),
      reader.readSInt32LE(),
    );
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
    protected readonly clientId: number,
  ) { super() }

  getGameCode() { return this.gameCode }
  getRejoiningClientId() { return this.clientId }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.WaitForHost, 8);

    writer.write(this.getGameCode());
    writer.writeSInt32LE(this.getRejoiningClientId());

    return writer;
  }
}
