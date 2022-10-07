import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { SocketContext } from "../../../../staticFactory/context";
import { GameObject } from "../../../abstract/rootPackets/gameObject";
import { GameCode } from "../../../abstract/types/gameCode";
import { GameObjectDespawn_V2018_11_14_0 } from "../../gameObject/despawn";
import { GameObjectRpc_V2018_11_14_0 } from "../../gameObject/rpc";
import { GameObjectSceneChange_V2018_11_14_0 } from "../../gameObject/sceneChange";
import { GameObjectSpawn_V2018_11_14_0 } from "../../gameObject/spawn";
import { GameObjectUpdate_V2018_11_14_0 } from "../../gameObject/update";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";

export abstract class GameObject_V2018_11_14_0 extends GameObject {
  static fromAbstract(data: GameObject): GameObject_V2018_11_14_0 {
    if (data.isDespawn()) {
      return GameObjectDespawn_V2018_11_14_0.fromAbstract(data);
    }

    if (data.isSceneChange()) {
      return GameObjectSceneChange_V2018_11_14_0.fromAbstract(data);
    }

    if (data.isSpawn()) {
      return GameObjectSpawn_V2018_11_14_0.fromAbstract(data);
    }

    if (data.isUpdate()) {
      return GameObjectUpdate_V2018_11_14_0.fromAbstract(data);
    }

    throw new Error("Unimplemented");
  }

  static deserialize(reader: MessageReader, context: SocketContext) {
    switch(reader.getTag()) {
      case 1: // GameData: Data
        return GameObjectUpdate_V2018_11_14_0.deserialize(reader, context);

      case 2: // GameData: RPC
        return GameObjectRpc_V2018_11_14_0.deserialize(reader, context);

      case 4: // GameData: Spawn
        return GameObjectSpawn_V2018_11_14_0.deserialize(reader);

      case 5: // GameData: Despawn
        return GameObjectDespawn_V2018_11_14_0.deserialize(reader);

      case 6: // GameData: SceneChagne
        return GameObjectSceneChange_V2018_11_14_0.deserialize(reader);

      default:
        throw new Error(`Unknown GameObject tag: ${reader.getTag()}`)
    }
  }

  constructor() { super() }

  isUpdate(): this is GameObjectUpdate_V2018_11_14_0 { return false }
  isRpc(): this is GameObjectRpc_V2018_11_14_0 { return false }
  isDespawn(): this is GameObjectDespawn_V2018_11_14_0 { return false }
  isSceneChange(): this is GameObjectSceneChange_V2018_11_14_0 { return false }
  isSpawn(): this is GameObjectSpawn_V2018_11_14_0 { return false }

  abstract serialize(): MessageWriter;
}
