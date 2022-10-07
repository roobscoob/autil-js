import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnGameData } from "../../abstract/spawn/gameData";
import { GameObjectSpawn_V2018_11_14_0 } from "../gameObject/spawn";
import { SpawnComponent_V2018_11_14_0 } from "./components";
import { SpawnGameDataComponent_V2018_11_14_0 } from "./components/gameData";

export class SpawnGameData_V2018_11_14_0 extends GameObjectSpawn_V2018_11_14_0 implements SpawnGameData {
  static fromAbstract(data: SpawnGameData) {
    return new SpawnGameData_V2018_11_14_0(
      data.getOwnerId(),
      data.isClientCharacter(),
      SpawnGameDataComponent_V2018_11_14_0.fromAbstract(data.getGameDataComponent()),
    )
  }

  static deserializeComponents(reader: BinaryReader, ownerId: number, isClientCharacter: boolean) {
    return new SpawnGameData_V2018_11_14_0(
      ownerId,
      isClientCharacter,
      SpawnComponent_V2018_11_14_0.deserialize(reader, SpawnGameDataComponent_V2018_11_14_0),
    )
  }

  constructor(
    ownerId: number,
    isClientCharacter: boolean,
    protected readonly gameData: SpawnGameDataComponent_V2018_11_14_0,
  ) { super(ownerId, isClientCharacter) }

  isSpawnGameData(): this is SpawnGameData_V2018_11_14_0 { return true }

  getGameDataComponent() { return this.gameData }

  getComponentCount() { return 1 }

  serializeComponents(): BinaryWriter {
    return this.getGameDataComponent().serialize();
  }
}
