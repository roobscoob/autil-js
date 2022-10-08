import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateCustomNetworkTransformComponent } from "../../../abstract/update/components/customNetworkTransform";
import { GameObjectUpdate_V2018_11_14_0 } from "../../gameObject/update";
import { Vector2_V2018_11_14_0 } from "../../types/vector2";

export class UpdateCustomNetworkTransformComponent_V2018_11_14_0 extends GameObjectUpdate_V2018_11_14_0 implements UpdateCustomNetworkTransformComponent {
  static fromAbstract(data: UpdateCustomNetworkTransformComponent) {
    return new UpdateCustomNetworkTransformComponent_V2018_11_14_0(
      data.getNetId(),
      data.getLastSequenceId(),
      Vector2_V2018_11_14_0.fromAbstract(data.getPosition()),
      Vector2_V2018_11_14_0.fromAbstract(data.getVelocity()),
    )
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const lastSequenceId = reader.readUInt16LE();
    const position = reader.read(Vector2_V2018_11_14_0);
    const velocity = reader.read(Vector2_V2018_11_14_0);

    return new UpdateCustomNetworkTransformComponent_V2018_11_14_0(netId, lastSequenceId, position, velocity);
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() !== 10)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  constructor(
    netId: number,
    protected readonly lastSequenceId: number,
    protected readonly position: Vector2_V2018_11_14_0,
    protected readonly velocity: Vector2_V2018_11_14_0,
  ) { super(netId) }

  isUpdateCustomNetworkTransform(): this is UpdateCustomNetworkTransformComponent {
    return true;
  }

  getLastSequenceId() { return this.lastSequenceId }
  getPosition() { return this.position }
  getVelocity() { return this.velocity }

  serializeContents(): MessageWriter {
    const writer = MessageWriter.allocate(10);

    writer.writeUInt16LE(this.getLastSequenceId());
    writer.write(this.getPosition());
    writer.write(this.getVelocity());

    return writer;
  }
}
