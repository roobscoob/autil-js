import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnComponent_V2018_11_14_0 } from ".";
import { SpawnPlayerControlComponent } from "../../../abstract/spawn/components/playerControl";

export class SpawnPlayerControlComponent_V2018_11_14_0 extends SpawnComponent_V2018_11_14_0 implements SpawnPlayerControlComponent {
  static fromAbstract(data: SpawnPlayerControlComponent) {
    let flag = 0;

    if (data.isImpostor()) flag |= 0b0000_0001;
    if (data.isDead()) flag |= 0b0000_0010;
    if (data.isGameOver()) flag | 0b0000_0100;

    return new SpawnPlayerControlComponent_V2018_11_14_0(
      data.getNetId(),
      data.getName(),
      data.getColor(),
      data.getHat(),
      data.isNew(),
      flag,
      data.getPlayerId(),
    );
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const name = reader.readString(reader.readPackedUInt32());
    const color = reader.readUInt8();
    const hat = reader.readPackedUInt32();
    const isNew = reader.readBoolean();
    const flags = reader.readUInt8();
    const playerId = reader.readUInt8();

    return new SpawnPlayerControlComponent_V2018_11_14_0(netId, name, color, hat, isNew, flags, playerId);
  }

  constructor(
    netId: number,
    protected readonly name: string,
    protected readonly color: number,
    protected readonly hat: number,
    protected readonly _isNew: boolean,
    protected readonly flags: number,
    protected readonly playerId: number,
  ) { super(netId) }

  isPlayerControl(): this is SpawnPlayerControlComponent {
    return true;
  }

  getName() { return this.name }
  getColor() { return this.color }
  getHat() { return this.hat }
  isNew() { return this._isNew }
  isImpostor() { return (this.flags & 0b0000_0001) === 1 }
  isDead() { return (this.flags & 0b0000_0010) === 1 }
  isGameOver() { return (this.flags & 0b0000_0100) === 1 }
  getPlayerId() { return this.playerId }

  serializeContents(): MessageWriter {
    const message = MessageWriter.allocate(16 + this.getName().length);

    message.writePackedUInt32(this.getName().length);
    message.writeString(this.getName());
    message.writeUInt8(this.getColor());
    message.writePackedUInt32(this.getHat());
    message.writeBoolean(this.isNew());
    message.writeUInt8(this.flags);
    message.writeUInt8(this.getPlayerId());

    return message;
  }
}
