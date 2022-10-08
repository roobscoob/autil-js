import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { AmbigousPacket } from "../../abstract/rootPackets/ambigous";
import { SocketContext } from "../../../staticFactory/context";
import { GameObjectAmbigousUpdate } from "../../abstract/gameObject/ambigous/update";
import { GameObjectUpdate } from "../../abstract/gameObject/update";
import { UpdateCustomNetworkTransformComponent } from "../../abstract/update/components/customNetworkTransform";
import { UpdateGameDataComponent } from "../../abstract/update/components/gameData";
import { UpdateLobbyBehaviourComponent } from "../../abstract/update/components/lobbyBehaviour";
import { UpdateMeetingHudComponent } from "../../abstract/update/components/meetingHud";
import { UpdatePlayerControlComponent } from "../../abstract/update/components/playerControl";
import { UpdatePlayerPhysicsComponent } from "../../abstract/update/components/playerPhysics";
import { UpdateShipStatusComponent } from "../../abstract/update/components/shipStatus";
import { GameObject_V2018_11_14_0 } from "../rootPackets/gameObject";
import { UpdateCustomNetworkTransformComponent_V2018_11_14_0 } from "../update/components/customNetworkTransform";
import { UpdateGameDataComponent_V2018_11_14_0 } from "../update/components/gameData";
import { UpdateLobbyBehaviourComponent_V2018_11_14_0 } from "../update/components/lobbyBehaviour";
import { UpdateMeetingHudComponent_V2018_11_14_0 } from "../update/components/meetingHud";
import { UpdatePlayerControlComponent_V2018_11_14_0 } from "../update/components/playerControl";
import { UpdatePlayerPhysicsComponent_V2018_11_14_0 } from "../update/components/playerPhysics";
import { UpdateShipStatusComponent_V2018_11_14_0 } from "../update/components/shipStatus";
import { GameObjectAmbigousUpdate_V2018_11_14_0 } from "./ambigous/update";

export abstract class GameObjectUpdate_V2018_11_14_0 extends GameObject_V2018_11_14_0 implements GameObjectUpdate {
  static fromAbstract(data: GameObjectUpdate) {
    if (data.isAmbigous()) {
      return GameObjectAmbigousUpdate_V2018_11_14_0.fromAbstract(data);
    }

    if (data.isUpdateCustomNetworkTransform()) {
      return UpdateCustomNetworkTransformComponent_V2018_11_14_0.fromAbstract(data);
    }

    if (data.isUpdateGameData()) {
      return UpdateGameDataComponent_V2018_11_14_0.fromAbstract(data);
    }

    if (data.isUpdateLobbyBehaviour()) {
      return UpdateLobbyBehaviourComponent_V2018_11_14_0.fromAbstract(data);
    }

    if ((data as any).isUpdateMeetingHud()) {
      return UpdateMeetingHudComponent_V2018_11_14_0.fromAbstract(data);
    }

    if ((data as any).isUpdatePlayerControl()) {
      return UpdatePlayerControlComponent_V2018_11_14_0.fromAbstract(data);
    }

    if ((data as any).isUpdatePlayerPhysics()) {
      return UpdatePlayerPhysicsComponent_V2018_11_14_0.fromAbstract(data);
    }

    if ((data as any).isUpdateShipStatus()) {
      return UpdateShipStatusComponent_V2018_11_14_0.fromAbstract(data);
    }

    throw new Error("Unknown abstract packet")
  }

  static deserialize(reader: BinaryReader, context: SocketContext) {
    const netId = reader.readPackedUInt32();
    const objectContext = context.getGameObject(netId);

    if (objectContext?.isGameData())
      return UpdateGameDataComponent_V2018_11_14_0.deserializeContents(reader, netId);

    if (objectContext?.isLobbyBehaviour())
      return UpdateLobbyBehaviourComponent_V2018_11_14_0.deserializeContents(reader, netId);

    if (objectContext?.isMeetingHud())
      return UpdateMeetingHudComponent_V2018_11_14_0.deserializeContents(reader, netId);

    if (objectContext?.isPlayerControl())
      return UpdatePlayerControlComponent_V2018_11_14_0.deserializeContents(reader, netId);

    if (objectContext?.isShipStatus())
      return UpdateShipStatusComponent_V2018_11_14_0.deserializeContents(reader, netId);

    if (objectContext?.isCustomNetworkTransform())
      return UpdateCustomNetworkTransformComponent_V2018_11_14_0.deserializeContents(reader, netId);

    if (objectContext?.isPlayerPhysics())
      return UpdatePlayerPhysicsComponent_V2018_11_14_0.deserializeContents(reader, netId);

    // unknown object. try to infer

    const gameData = UpdateGameDataComponent_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
    const lobbyBehaviour = UpdateLobbyBehaviourComponent_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
    const meetingHud = UpdateMeetingHudComponent_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
    const playerControl = UpdatePlayerControlComponent_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
    const shipStatus = UpdateShipStatusComponent_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
    const customNetworkTransform = UpdateCustomNetworkTransformComponent_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
    const playerPhysics = UpdatePlayerPhysicsComponent_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);

    const possibilities = [gameData, lobbyBehaviour, meetingHud, playerControl, shipStatus, customNetworkTransform, playerPhysics];

    if (possibilities.every(v => v === undefined))
      throw new Error("Failed to infer NetObjectKind for Update packet.")

    const filteredPossibilities = possibilities.filter(e => e) as 
      (UpdateGameDataComponent_V2018_11_14_0 |
      UpdateLobbyBehaviourComponent_V2018_11_14_0 |
      UpdateMeetingHudComponent_V2018_11_14_0 |
      UpdatePlayerControlComponent_V2018_11_14_0 |
      UpdateShipStatusComponent_V2018_11_14_0 |
      UpdateCustomNetworkTransformComponent_V2018_11_14_0 |
      UpdatePlayerPhysicsComponent_V2018_11_14_0)[]
    ;

    if (filteredPossibilities.length === 1)
      return filteredPossibilities[0];

    const ambigous = GameObjectAmbigousUpdate_V2018_11_14_0.fromChocies(netId, ...filteredPossibilities);

    return ambigous;
  }

  constructor(
    protected readonly netId: number,
  ) { super() }

  isUpdateCustomNetworkTransform(): this is UpdateCustomNetworkTransformComponent {
    return false;
  }

  isUpdateGameData(): this is UpdateGameDataComponent {
    return false;
  }

  isUpdateLobbyBehaviour(): this is UpdateLobbyBehaviourComponent {
    return false;
  }

  isUpdateMeetingHud(): this is UpdateMeetingHudComponent {
    return false;
  }

  isUpdatePlayerControl(): this is UpdatePlayerControlComponent {
    return false;
  }

  isUpdatePlayerPhysics(): this is UpdatePlayerPhysicsComponent {
    return false;
  }

  isUpdateShipStatus(): this is UpdateShipStatusComponent {
    return false;
  }

  isAmbigous(): this is GameObjectAmbigousUpdate { return false }

  getNetId() { return this.netId }

  abstract serializeContents(): BinaryWriter;

  serialize(): MessageWriter {
    const contents = this.serializeContents().getBuffer();

    const writer = MessageWriter.allocateTagged(1, 6 + contents.byteLength)

    writer.writePackedUInt32(this.getNetId());
    writer.writeBytes(contents);

    return writer;
  }
}
