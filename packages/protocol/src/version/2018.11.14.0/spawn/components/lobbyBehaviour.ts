import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnComponent_V2018_11_14_0 } from ".";
import { SpawnLobbyBehaviourComponent } from "../../../abstract/spawn/components/lobbyBehaviour";

export class SpawnLobbyBehaviourComponent_V2018_11_14_0 extends SpawnComponent_V2018_11_14_0 implements SpawnLobbyBehaviourComponent {
  static fromAbstract(data: SpawnLobbyBehaviourComponent) {
    return new SpawnLobbyBehaviourComponent_V2018_11_14_0(data.getNetId())
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new SpawnLobbyBehaviourComponent_V2018_11_14_0(netId);
  }

  isLobbyBehaviour(): this is SpawnLobbyBehaviourComponent {
    return true;
  }

  constructor(
    netId: number,
  ) { super(netId) }

  serializeContents(): MessageWriter {
    return MessageWriter.allocate(0)
  }
}
