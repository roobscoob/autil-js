import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnComponent_V2018_11_14_0 } from ".";
import { SpawnPlayerPhysicsComponent } from "../../../abstract/spawn/components/playerPhysics";

export class SpawnPlayerPhysicsComponent_V2018_11_14_0 extends SpawnComponent_V2018_11_14_0 implements SpawnPlayerPhysicsComponent {
  static fromAbstract(data: SpawnPlayerPhysicsComponent) {
    return new SpawnPlayerPhysicsComponent_V2018_11_14_0(data.getNetId())
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new SpawnPlayerPhysicsComponent_V2018_11_14_0(netId);
  }

  constructor(
    netId: number,
  ) { super(netId) }

  isPlayerPhysics(): this is SpawnPlayerPhysicsComponent {
    return true;
  }

  serializeContents(): MessageWriter {
    return MessageWriter.allocate(0);
  }
}
