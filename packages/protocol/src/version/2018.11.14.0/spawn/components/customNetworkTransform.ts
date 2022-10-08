import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnComponent_V2018_11_14_0 } from ".";
import { SpawnCustomNetworkTransformComponent } from "../../../abstract/spawn/components/customNetworkTransform";
import { Vector2_V2018_11_14_0 } from "../../types/vector2";

export class SpawnCustomNetworkTransformComponent_V2018_11_14_0 extends SpawnComponent_V2018_11_14_0 implements SpawnCustomNetworkTransformComponent {
  static fromAbstract(data: SpawnCustomNetworkTransformComponent) {
    return new SpawnCustomNetworkTransformComponent_V2018_11_14_0(
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

    return new SpawnCustomNetworkTransformComponent_V2018_11_14_0(netId, lastSequenceId, position, velocity);
  }

  constructor(
    netId: number,
    protected readonly lastSequenceId: number,
    protected readonly position: Vector2_V2018_11_14_0,
    protected readonly velocity: Vector2_V2018_11_14_0,
  ) { super(netId) }

  isCustomNetworkTransform(): this is SpawnCustomNetworkTransformComponent {
    return true;
  }

  getLastSequenceId() { return this.lastSequenceId }
  getPosition() { return this.position }
  getVelocity() { return this.velocity }

  serializeContents(): MessageWriter {
    const message = MessageWriter.allocate(10)

    message.writeUInt16LE(this.getLastSequenceId());
    message.write(this.getPosition());
    message.write(this.getVelocity());

    return message;
  }
}
