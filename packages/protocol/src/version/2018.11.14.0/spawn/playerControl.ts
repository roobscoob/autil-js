import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnPlayerControl } from "../../abstract/spawn/playerControl";
import { GameObjectSpawn_V2018_11_14_0 } from "../gameObject/spawn";
import { RootPacketTags_V2018_11_14_0 } from "../tags";
import { SpawnPlayerControlComponent_V2018_11_14_0 } from "./components/playerControl";
import { SpawnPlayerPhysicsComponent_V2018_11_14_0 } from "./components/playerPhysics";
import { SpawnCustomNetworkTransformComponent_V2018_11_14_0 } from "./components/customNetworkTransform";
import { SpawnComponent_V2018_11_14_0 } from "./components";

export class SpawnPlayerControl_V2018_11_14_0 extends GameObjectSpawn_V2018_11_14_0 implements SpawnPlayerControl {
  static fromAbstract(data: SpawnPlayerControl) {
    return new SpawnPlayerControl_V2018_11_14_0(
      data.getOwnerId(),
      data.isClientCharacter(),
      SpawnPlayerControlComponent_V2018_11_14_0.fromAbstract(data.getPlayerControlComponent()),
      SpawnPlayerPhysicsComponent_V2018_11_14_0.fromAbstract(data.getPlayerPhysicsComponent()),
      SpawnCustomNetworkTransformComponent_V2018_11_14_0.fromAbstract(data.getCustomNetworkTransformComponent()),
    )
  }

  static deserializeComponents(reader: BinaryReader, ownerId: number, isClientCharacter: boolean) {
    return new SpawnPlayerControl_V2018_11_14_0(
      ownerId,
      isClientCharacter,
      SpawnComponent_V2018_11_14_0.deserialize(reader, SpawnPlayerControlComponent_V2018_11_14_0),
      SpawnComponent_V2018_11_14_0.deserialize(reader, SpawnPlayerPhysicsComponent_V2018_11_14_0),
      SpawnComponent_V2018_11_14_0.deserialize(reader, SpawnCustomNetworkTransformComponent_V2018_11_14_0),
    )
  }

  constructor(
    ownerId: number,
    isClientCharacter: boolean,
    protected readonly playerControl: SpawnPlayerControlComponent_V2018_11_14_0,
    protected readonly playerPhysics: SpawnPlayerPhysicsComponent_V2018_11_14_0,
    protected readonly customNetworkTransform: SpawnCustomNetworkTransformComponent_V2018_11_14_0,
  ) { super(ownerId, isClientCharacter) }

  isSpawnPlayerControl(): this is SpawnPlayerControl_V2018_11_14_0 {
    return true;
  }

  getPlayerControlComponent() { return this.playerControl }
  getPlayerPhysicsComponent() { return this.playerPhysics }
  getCustomNetworkTransformComponent() { return this.customNetworkTransform }

  getComponentCount() { return 3 }

  serializeComponents(): BinaryWriter {
    const pc = this.getPlayerControlComponent().serialize().getBuffer();
    const pp = this.getPlayerPhysicsComponent().serialize().getBuffer();
    const cnt = this.getCustomNetworkTransformComponent().serialize().getBuffer();

    const writer = BinaryWriter.allocate(pc.byteLength + pp.byteLength + cnt.byteLength);

    writer.writeBytes(pc);
    writer.writeBytes(pp);
    writer.writeBytes(cnt);

    return writer;
  }
}
