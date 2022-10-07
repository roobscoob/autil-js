import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateLobbyBehaviourComponent } from "../../../abstract/update/components/lobbyBehaviour";
import { GameObjectUpdate_V2018_11_14_0 } from "../../gameObject/update";

export class UpdateLobbyBehaviourComponent_V2018_11_14_0 extends GameObjectUpdate_V2018_11_14_0 implements UpdateLobbyBehaviourComponent {
  static fromAbstract(data: UpdateLobbyBehaviourComponent) {
    return new UpdateLobbyBehaviourComponent_V2018_11_14_0(data.getNetId());
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new UpdateLobbyBehaviourComponent_V2018_11_14_0(netId);
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() > 0)
      return undefined;

    return new UpdateLobbyBehaviourComponent_V2018_11_14_0(netId);
  }

  isUpdateLobbyBehaviour(): this is UpdateLobbyBehaviourComponent {
    return true;
  }

  constructor(
    netId: number,
  ) { super(netId) }

  serializeContents(): MessageWriter {
    return MessageWriter.allocate(0)
  }
}
