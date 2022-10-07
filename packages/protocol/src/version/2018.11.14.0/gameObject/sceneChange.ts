// pre-imports

import "./spawn";

// used imports

import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { GameObjectSceneChange } from "../../abstract/gameObject/sceneChange";
import { GameObject_V2018_11_14_0 } from "../rootPackets/gameObject";

export class GameObjectSceneChange_V2018_11_14_0 extends GameObject_V2018_11_14_0 implements GameObjectSceneChange {
  static fromAbstract(data: GameObjectSceneChange) {
    return new GameObjectSceneChange_V2018_11_14_0(
      data.getClientId(),
      data.getTargetScene(),
    )
  }

  static deserialize(reader: BinaryReader): GameObjectSceneChange_V2018_11_14_0 {
    return new GameObjectSceneChange_V2018_11_14_0(
      reader.readPackedInt32(),
      reader.readString(reader.readPackedInt32()),
    )
  }

  constructor(
    protected readonly clientId: number,
    protected readonly targetScene: string,
  ) { super() }

  getClientId() { return this.clientId }
  getTargetScene() { return this.targetScene }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(5, 6);

    writer.writePackedInt32(this.getClientId());
    writer.writePackedInt32(this.getTargetScene().length);
    writer.writeString(this.getTargetScene());

    return writer;
  }
}
