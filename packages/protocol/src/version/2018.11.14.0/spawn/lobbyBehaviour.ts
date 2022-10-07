import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnLobbyBehaviour } from "../../abstract/spawn/lobbyBehaviour";
import { GameObjectSpawn_V2018_11_14_0 } from "../gameObject/spawn";
import { RootPacketTags_V2018_11_14_0 } from "../tags";
import { SpawnComponent_V2018_11_14_0 } from "./components";
import { SpawnLobbyBehaviourComponent_V2018_11_14_0 } from "./components/lobbyBehaviour";

export class SpawnLobbyBehaviour_V2018_11_14_0 extends GameObjectSpawn_V2018_11_14_0 implements SpawnLobbyBehaviour {
  static fromAbstract(data: SpawnLobbyBehaviour) {
    return new SpawnLobbyBehaviour_V2018_11_14_0(
      data.getOwnerId(),
      data.isClientCharacter(),
      SpawnLobbyBehaviourComponent_V2018_11_14_0.fromAbstract(data.getLobbyBehaviourComponent()),
    )
  }

  static deserializeComponents(reader: BinaryReader, ownerId: number, isClientCharacter: boolean) {
    return new SpawnLobbyBehaviour_V2018_11_14_0(
      ownerId,
      isClientCharacter,
      SpawnComponent_V2018_11_14_0.deserialize(reader, SpawnLobbyBehaviourComponent_V2018_11_14_0),
    )
  }

  constructor(
    ownerId: number,
    isClientCharacter: boolean,
    protected readonly lobbyBehaviour: SpawnLobbyBehaviourComponent_V2018_11_14_0,
  ) { super(ownerId, isClientCharacter) }

  isSpawnLobbyBehaviour(): this is SpawnLobbyBehaviour_V2018_11_14_0 {
    return true;
  }

  getLobbyBehaviourComponent() { return this.lobbyBehaviour }

  getComponentCount() { return 1 }

  serializeComponents(): BinaryWriter {
    return this.getLobbyBehaviourComponent().serialize();
  }
}
