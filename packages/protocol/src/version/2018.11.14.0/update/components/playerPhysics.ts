import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdatePlayerPhysicsComponent } from "../../../abstract/update/components/playerPhysics";
import { GameObjectUpdate_V2018_11_14_0 } from "../../gameObject/update";

export class UpdatePlayerPhysicsComponent_V2018_11_14_0 extends GameObjectUpdate_V2018_11_14_0 implements UpdatePlayerPhysicsComponent {
  static fromAbstract(data: UpdatePlayerPhysicsComponent) {
    return new UpdatePlayerPhysicsComponent_V2018_11_14_0(data.getNetId());
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new UpdatePlayerPhysicsComponent_V2018_11_14_0(netId);
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.hasBytesLeftToRead())
      return undefined;

    return new UpdatePlayerPhysicsComponent_V2018_11_14_0(netId);
  }

  constructor(
    netId: number,
  ) { super(netId) }

  isUpdatePlayerPhysics(): this is UpdatePlayerPhysicsComponent {
    return false;
  }

  serializeContents(): MessageWriter {
    return MessageWriter.allocate(0);
  }
}
