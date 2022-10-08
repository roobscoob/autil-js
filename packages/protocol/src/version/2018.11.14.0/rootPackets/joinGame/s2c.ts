import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SocketContext } from "../../../../staticFactory/context";
import { JoinGameS2CBroadcast, JoinGameS2CRejection } from "../../../abstract/rootPackets/joinGame";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";

export class JoinGameS2C_V2018_11_14_0 {
  static tryDeserialize(reader: BinaryReader) {
    if (reader.countRemainingBytes() === 4)
      return JoinGameS2CRejection_V2018_11_14_0.tryDeserialize(reader);

    JoinGameS2CBroadcast_V2018_11_14_0.tryDeserialize(reader);
  }

  static deserialize(reader: BinaryReader) {
    const remainingLength = reader.countRemainingBytes();

    if (remainingLength === 4) {
      return JoinGameS2CRejection_V2018_11_14_0.deserialize(reader);
    }

    return JoinGameS2CBroadcast_V2018_11_14_0.deserialize(reader);
  }
}

export class JoinGameS2CRejection_V2018_11_14_0 extends JoinGameS2CRejection {
  static fromAbstract(data: JoinGameS2CRejection) {
    return new JoinGameS2CRejection_V2018_11_14_0(
      data.getDisconnectReason(),
    )
  }

  static tryDeserialize(reader: BinaryReader) {
    if (reader.countRemainingBytes() !== 4)
      return undefined;

    try {
      return this.deserialize(reader);
    } catch(e) {
      return undefined;
    }
  }

  static deserialize(reader: BinaryReader) {
    return new JoinGameS2CRejection_V2018_11_14_0(reader.readSInt32LE());
  }

  constructor(
    protected readonly disconnectReason: number,
  ) { super() }

  getDisconnectReason(): number { return this.disconnectReason }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.JoinGame, 4);
    writer.writeSInt32LE(this.getDisconnectReason());
    return writer;
  }
}

export class JoinGameS2CBroadcast_V2018_11_14_0 extends JoinGameS2CBroadcast {
  static fromAbstract(data: JoinGameS2CBroadcast) {
    return new JoinGameS2CBroadcast_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
      data.getJoiningClientId(),
      data.getHostClientId(),
    )
  }

  static tryDeserialize(reader: BinaryReader) {
    if (reader.countRemainingBytes() !== 12)
      return undefined;

    try {
      return this.deserialize(reader)
    } catch(err) {
      return undefined;
    }
  }

  static deserialize(reader: BinaryReader) {
    return new JoinGameS2CBroadcast_V2018_11_14_0(
      reader.read(GameCode_V2018_11_14_0),
      reader.readSInt32LE(),
      reader.readSInt32LE(),
    )
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
    protected readonly joiningClientId: number,
    protected readonly hostClientId: number,
  ) { super() }

  getGameCode() { return this.gameCode }
  getJoiningClientId() { return this.joiningClientId }
  getHostClientId() { return this.hostClientId }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.JoinGame, 12);

    writer.write(this.gameCode);
    writer.writeSInt32LE(this.getJoiningClientId());
    writer.writeSInt32LE(this.getHostClientId());

    return writer;
  }
}
