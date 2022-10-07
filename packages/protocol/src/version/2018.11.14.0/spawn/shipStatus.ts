import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnShipStatus } from "../../abstract/spawn/shipStatus";
import { GameObjectSpawn_V2018_11_14_0 } from "../gameObject/spawn";
import { RootPacketTags_V2018_11_14_0 } from "../tags";
import { SpawnComponent_V2018_11_14_0 } from "./components";
import { SpawnShipStatusComponent_V2018_11_14_0 } from "./components/shipStatus";

export class SpawnShipStatus_V2018_11_14_0 extends GameObjectSpawn_V2018_11_14_0 implements SpawnShipStatus {
  static fromAbstract(data: SpawnShipStatus) {
    return new SpawnShipStatus_V2018_11_14_0(
      data.getOwnerId(),
      data.isClientCharacter(),
      SpawnShipStatusComponent_V2018_11_14_0.fromAbstract(data.getShipStatusComponent()),
    )
  }

  static deserializeComponents(reader: BinaryReader, ownerId: number, isClientCharacter: boolean) {
    return new SpawnShipStatus_V2018_11_14_0(
      ownerId,
      isClientCharacter,
      SpawnComponent_V2018_11_14_0.deserialize(reader, SpawnShipStatusComponent_V2018_11_14_0),
    )
  }

  constructor(
    ownerId: number,
    isClientCharacter: boolean,
    protected readonly shipStatus: SpawnShipStatusComponent_V2018_11_14_0,
  ) { super(ownerId, isClientCharacter) }

  isSpawnShipStatus(): this is SpawnShipStatus_V2018_11_14_0 {
    return true;
  }

  getShipStatusComponent() { return this.shipStatus }

  getComponentCount() { return 1 }

  serializeComponents(): BinaryWriter {
    return this.getShipStatusComponent().serialize();
  }
}
