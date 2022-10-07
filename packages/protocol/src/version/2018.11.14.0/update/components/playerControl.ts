import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdatePlayerControlComponent } from "../../../abstract/update/components/playerControl";
import { GameObjectUpdate_V2018_11_14_0 } from "../../gameObject/update";

export class UpdatePlayerControlComponent_V2018_11_14_0 extends GameObjectUpdate_V2018_11_14_0 implements UpdatePlayerControlComponent {
  static fromAbstract(data: UpdatePlayerControlComponent) {
    let flag = 0;

    if (data.isImpostor()) flag |= 0b0000_0001;
    if (data.isDead()) flag |= 0b0000_0010;
    if (data.isGameOver())  flag | 0b0000_0100;

    return new UpdatePlayerControlComponent_V2018_11_14_0(
      data.getNetId(),
      flag,
      data.getPlayerId(),
    )
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const flags = reader.readUInt8();
    const playerId = reader.readUInt8();

    return new UpdatePlayerControlComponent_V2018_11_14_0(netId, flags, playerId);
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() !== 2)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  constructor(
    netId: number,
    protected readonly flags: number,
    protected readonly playerId: number,
  ) { super(netId) }

  isUpdatePlayerControl(): this is UpdatePlayerControlComponent {
    return true;
  }

  isImpostor() { return (this.flags & 0b0000_0001) === 1 }
  isDead() { return (this.flags & 0b0000_0010) === 1 }
  isGameOver() { return (this.flags & 0b0000_0100) === 1 }
  getPlayerId() { return this.playerId }

  serializeContents(): MessageWriter {
    const message = MessageWriter.allocate(2);

    message.writeUInt8(this.flags);
    message.writeUInt8(this.getPlayerId());

    return message;
  }
}
