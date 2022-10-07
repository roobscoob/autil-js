import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnComponent } from "../../../abstract/spawn/components";
import { SpawnGameDataComponent } from "../../../abstract/spawn/components/gameData";
import { SpawnCustomNetworkTransformComponent_V2018_11_14_0 } from "./customNetworkTransform";
import { SpawnGameDataComponent_V2018_11_14_0 } from "./gameData";
import { SpawnLobbyBehaviourComponent_V2018_11_14_0 } from "./lobbyBehaviour";
import { SpawnMeetingHudComponent_V2018_11_14_0 } from "./meetingHud";
import { SpawnPlayerControlComponent_V2018_11_14_0 } from "./playerControl";
import { SpawnPlayerPhysicsComponent_V2018_11_14_0 } from "./playerPhysics";
import { SpawnShipStatusComponent_V2018_11_14_0 } from "./shipStatus";

export abstract class SpawnComponent_V2018_11_14_0 extends SpawnComponent {
  static fromAbstract(data: SpawnComponent) {
    if (data.isCustomNetworkTransform())
      return SpawnCustomNetworkTransformComponent_V2018_11_14_0.fromAbstract(data);

    if (data.isGameData())
      return SpawnGameDataComponent_V2018_11_14_0.fromAbstract(data);

    if (data.isLobbyBehaviour())
      return SpawnLobbyBehaviourComponent_V2018_11_14_0.fromAbstract(data);

    if ((data as any).isMeetingHud())
      return SpawnMeetingHudComponent_V2018_11_14_0.fromAbstract(data);

    if ((data as any).isPlayerControl())
      return SpawnPlayerControlComponent_V2018_11_14_0.fromAbstract(data);

    if ((data as any).isPlayerPhysics())
      return SpawnPlayerPhysicsComponent_V2018_11_14_0.fromAbstract(data);

    if ((data as any).isShipStatus())
      return SpawnShipStatusComponent_V2018_11_14_0.fromAbstract(data);
  }

  static deserialize<T>(parentReader: BinaryReader, component: { deserializeContents(reader: BinaryReader, netId: number): T }): T {
    const netId = parentReader.readPackedUInt32();
    const reader = parentReader.read(MessageReader);
    return reader.read(component.deserializeContents, netId);
  }

  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }

  abstract serializeContents(): MessageWriter;

  serialize(): BinaryWriter {
    const msg = this.serializeContents().serialize().getBuffer();

    const writer = BinaryWriter.allocate(6 + msg.byteLength);

    writer.writePackedUInt32(this.netId);
    writer.writeBytes(msg);

    return writer;
  }
}
