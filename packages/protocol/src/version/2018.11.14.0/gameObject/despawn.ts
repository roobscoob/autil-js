// pre-import

import "./rpc";

// used imports

import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { GameObjectDespawn } from "../../abstract/gameObject/despawn";
import { GameObject_V2018_11_14_0 } from "../rootPackets/gameObject";

export class GameObjectDespawn_V2018_11_14_0 extends GameObject_V2018_11_14_0 implements GameObjectDespawn {
  static fromAbstract(data: GameObjectDespawn) {
    return new GameObjectDespawn_V2018_11_14_0(
      data.getNetId(),
    )
  }

  static deserialize(reader: BinaryReader): GameObjectDespawn_V2018_11_14_0 {
    return new GameObjectDespawn_V2018_11_14_0(
      reader.readPackedUInt32(),
    )
  }

  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(5, 6);

    writer.writePackedUInt32(this.getNetId());

    return writer;
  }
}
