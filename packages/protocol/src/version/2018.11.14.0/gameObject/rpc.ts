// pre-imports

import "./sceneChange";

// used imports

import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { GameObjectRpc } from "../../abstract/gameObject/rpc";
import { GameObject_V2018_11_14_0 } from "../rootPackets/gameObject";
import { SocketContext } from "../../../staticFactory/context";
import { MessageWriter } from "@autil/hazel";
import { RpcCastVote } from "../../abstract/rpc/castVote";
import { RpcCheckColor } from "../../abstract/rpc/checkColor";
import { RpcCheckName } from "../../abstract/rpc/checkName";
import { RpcClearVote } from "../../abstract/rpc/clearVote";
import { RpcClose } from "../../abstract/rpc/close";
import { RpcCloseDoorsOfType } from "../../abstract/rpc/closeDoorsOfType";
import { RpcCompleteTask } from "../../abstract/rpc/completeTask";
import { RpcEnterVent } from "../../abstract/rpc/enterVent";
import { RpcExitAllVents } from "../../abstract/rpc/exitAllVents";
import { RpcExitVent } from "../../abstract/rpc/exitVent";
import { RpcMurderPlayer } from "../../abstract/rpc/murderPlayer";
import { RpcPlayAnimation } from "../../abstract/rpc/playAnimation";
import { RpcReady } from "../../abstract/rpc/ready";
import { RpcRepairSystem } from "../../abstract/rpc/repairSystem";
import { RpcReportDeadBody } from "../../abstract/rpc/reportDeadBody";
import { RpcSendChat } from "../../abstract/rpc/sendChat";
import { RpcSetColor } from "../../abstract/rpc/setColor";
import { RpcSetHat } from "../../abstract/rpc/setHat";
import { RpcSetInfected } from "../../abstract/rpc/setInfected";
import { RpcSetName } from "../../abstract/rpc/setName";
import { RpcSetTimesImpostor } from "../../abstract/rpc/setTimesImpostor";
import { RpcSetTasks } from "../../abstract/rpc/setTasks";
import { RpcSnapTo } from "../../abstract/rpc/snapTo";
import { RpcStartMeeting } from "../../abstract/rpc/startMeeting";
import { RpcSyncSettings } from "../../abstract/rpc/syncSettings";
import { RpcVotingComplete } from "../../abstract/rpc/votingComplete";
import { RpcSnapTo_V2018_11_14_0 } from "../rpc/snapTo";
import { RpcSetTasks_V2018_11_14_0 } from "../rpc/setTasks";
import { RpcClose_V2018_11_14_0 } from "../rpc/close";
import { RpcPlayAnimation_V2018_11_14_0 } from "../rpc/playAnimation";
import { RpcEnterVent_V2018_11_14_0 } from "../rpc/enterVent";
import { RpcCloseDoorsOfType_V2018_11_14_0 } from "../rpc/closeDoorsOfType";
import { GameObjectAmbigousRpc_V2018_11_14_0 } from "./ambigous/rpc";
import { GameObjectAmbigousRpc } from "../../abstract/gameObject/ambigous/rpc";
import { RpcGameDataCompleteTask_V2018_11_14_0, RpcPlayerControlCompleteTask_V2018_11_14_0 } from "../rpc/completeTask";
import { RpcVotingComplete_V2018_11_14_0 } from "../rpc/votingComplete";
import { RpcExitVent_V2018_11_14_0 } from "../rpc/exitVent";
import { RpcRepairSystem_V2018_11_14_0 } from "../rpc/repairSystem";
import { RpcCastVote_V2018_11_14_0 } from "../rpc/castVote";
import { RpcSyncSettings_V2018_11_14_0 } from "../rpc/syncSettings";
import { RpcExitAllVents_V2018_11_14_0 } from "../rpc/exitAllVents";
import { RpcClearVote_V2018_11_14_0 } from "../rpc/clearVote";
import { RpcSetInfected_V2018_11_14_0 } from "../rpc/setInfected";
import { RpcExiled } from "../../abstract/rpc/exiled";
import { RpcExiled_V2018_11_14_0 } from "../rpc/exiled";
import { RpcCheckColor_V2018_11_14_0 } from "../rpc/checkColor";
import { RpcSetName_V2018_11_14_0 } from "../rpc/setName";
import { RpcCheckName_V2018_11_14_0 } from "../rpc/checkName";
import { RpcSetHat_V2018_11_14_0 } from "../rpc/setHat";
import { RpcSetColor_V2018_11_14_0 } from "../rpc/setColor";
import { RpcReportDeadBody_V2018_11_14_0 } from "../rpc/reportDeadBody";
import { RpcMurderPlayer_V2018_11_14_0 } from "../rpc/murderPlayer";
import { RpcSendChat_V2018_11_14_0 } from "../rpc/sendChat";
import { RpcSetTimesImpostor_V2018_11_14_0 } from "../rpc/setTimesImpostor";
import { RpcReady_V2018_11_14_0 } from "../rpc/ready";
import { RpcStartMeeting_V2018_11_14_0 } from "../rpc/startMeeting";
import { GameObject } from "../../abstract/rootPackets/gameObject";

export abstract class GameObjectRpc_V2018_11_14_0 extends GameObject_V2018_11_14_0 implements GameObjectRpc {
  static fromAbstract(data: GameObjectRpc): GameObjectRpc_V2018_11_14_0 {
    if ((data as any).isRpcCompleteTask()) {
      const pc = (data as any).getPlayerControlNetId();

      if (pc !== undefined)
        return RpcGameDataCompleteTask_V2018_11_14_0.fromAbstract(data as any);

      return RpcPlayerControlCompleteTask_V2018_11_14_0.fromAbstract(data as any);
    }

    if ((data as any).isRpcCastVote()) return RpcCastVote_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcCheckColor()) return RpcCheckColor_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcCheckName()) return RpcCheckName_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcClearVote()) return RpcClearVote_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcClose()) return RpcClose_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcCloseDoorsOfType()) return RpcCloseDoorsOfType_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcEnterVent()) return RpcEnterVent_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcExitAllVents()) return RpcExitAllVents_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcExitVent()) return RpcExitVent_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcMurderPlayer()) return RpcMurderPlayer_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcPlayAnimation()) return RpcPlayAnimation_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcReady()) return RpcReady_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcRepairSystem()) return RpcRepairSystem_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcReportDeadBody()) return RpcReportDeadBody_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcSendChat()) return RpcSendChat_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcSetColor()) return RpcSetColor_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcSetHat()) return RpcSetHat_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcSetInfected()) return RpcSetInfected_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcSetName()) return RpcSetName_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcSetTimesImpostor()) return RpcSetTimesImpostor_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcSetTasks()) return RpcSetTasks_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcSnapTo()) return RpcSnapTo_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcStartMeeting()) return RpcStartMeeting_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcSyncSettings()) return RpcSyncSettings_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcVotingComplete()) return RpcVotingComplete_V2018_11_14_0.fromAbstract(data as any)
    if ((data as any).isRpcExiled()) return RpcExiled_V2018_11_14_0.fromAbstract(data as any)
  
    throw new Error(`Unknown RPC`)
  }

  static deserialize(reader: BinaryReader, context: SocketContext) {
    const netId = reader.readPackedUInt32();
    const objectContext = context.getGameObject(netId);
    const callId = reader.readUInt8();

    if (objectContext?.isLobbyBehaviour())
      throw new Error("Unknown RPC " + callId + " on LobbyBehaviour");

    if (callId === 0) {
      // possible ambiguity between: SnapTo,SetTasks,Close,PlayAnimation,EnterVent,CloseDoorsOfType

      if (objectContext) {
        if (objectContext.isCustomNetworkTransform())
          return RpcSnapTo_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isGameData())
          return RpcSetTasks_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isMeetingHud())
          return RpcClose_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isPlayerControl())
          return RpcPlayAnimation_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isPlayerPhysics())
          return RpcEnterVent_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isShipStatus())
          return RpcCloseDoorsOfType_V2018_11_14_0.deserializeContents(reader, netId);

        throw new Error("Unknown Object Kind");
      }

      const snapTo = RpcSnapTo_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
      const setTasks = RpcSetTasks_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
      const close = RpcClose_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
      const playAnimation = RpcPlayAnimation_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
      const enterVent = RpcEnterVent_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
      const closeDoorsOfType = RpcCloseDoorsOfType_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);

      const possibilities = [snapTo, setTasks, close, playAnimation, enterVent, closeDoorsOfType];

      if (possibilities.every(v => v === undefined))
        throw new Error("Failed to infer NetObjectKind for Rpc packet.")

      const filteredPossibilities = possibilities.filter(e => e) as (
        RpcSnapTo_V2018_11_14_0 |
        RpcSetTasks_V2018_11_14_0 |
        RpcClose_V2018_11_14_0 |
        RpcPlayAnimation_V2018_11_14_0 |
        RpcEnterVent_V2018_11_14_0 |
        RpcCloseDoorsOfType_V2018_11_14_0
      )[];

      if (filteredPossibilities.length === 1)
        return filteredPossibilities[0];

      const ambigous = GameObjectAmbigousRpc_V2018_11_14_0.fromChocies(netId, ...filteredPossibilities);

      return ambigous;
    }

    if (objectContext?.isCustomNetworkTransform())
      throw new Error("Unknown RPC " + callId + " on CustomNetworkTransform");

    if (callId === 1) {
      if (objectContext) {
        if ((objectContext as any).isGameData())
          return RpcGameDataCompleteTask_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isMeetingHud())
          return RpcVotingComplete_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isPlayerControl())
          return RpcPlayerControlCompleteTask_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isPlayerPhysics())
          return RpcExitVent_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isShipStatus())
          return RpcRepairSystem_V2018_11_14_0.deserializeContents(reader, netId);

        throw new Error("Unknown Object Kind");
      }

      const snapTo = RpcGameDataCompleteTask_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
      const setTasks = RpcVotingComplete_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
      const close = RpcPlayerControlCompleteTask_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
      const playAnimation = RpcExitVent_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);
      const enterVent = RpcRepairSystem_V2018_11_14_0.tryDeserializeContents(reader.clone(), netId);

      const possibilities = [snapTo, setTasks, close, playAnimation, enterVent];

      if (possibilities.every(v => v === undefined))
        throw new Error("Failed to infer NetObjectKind for Rpc packet.")

      const filteredPossibilities = possibilities.filter(e => e) as (
        RpcGameDataCompleteTask_V2018_11_14_0 |
        RpcVotingComplete_V2018_11_14_0 |
        RpcPlayerControlCompleteTask_V2018_11_14_0 |
        RpcExitVent_V2018_11_14_0 |
        RpcRepairSystem_V2018_11_14_0
      )[];

      if (filteredPossibilities.length === 1)
        return filteredPossibilities[0];

      const ambigous = GameObjectAmbigousRpc_V2018_11_14_0.fromChocies(netId, ...filteredPossibilities);

      return ambigous;
    }

    if (objectContext?.isGameData())
      throw new Error("Unknown RPC " + callId + " on GameData");

    if (objectContext?.isShipStatus())
      throw new Error("Unknown RPC " + callId + " on ShipStatus");

    if (callId === 2) {
      if (objectContext) {
        if (objectContext.isMeetingHud())
          return RpcCastVote_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isPlayerControl())
          return RpcSyncSettings_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isPlayerPhysics())
          return RpcExitAllVents_V2018_11_14_0.deserializeContents(reader, netId);

        throw new Error("Unknown Object Kind");
      }

      if (reader.countRemainingBytes() === 2)
        return RpcCastVote_V2018_11_14_0.deserializeContents(reader, netId);

      if (reader.countRemainingBytes() === 0)
        return RpcExitAllVents_V2018_11_14_0.deserializeContents(reader, netId);

      try {
        return RpcSyncSettings_V2018_11_14_0.deserializeContents(reader, netId);
      } catch (err) {
        throw new Error("Failed to infer NetObjectKind for Rpc packet.")
      }
    }

    if (objectContext?.isPlayerPhysics())
      throw new Error("Unknown RPC " + callId + " on ShipStatus");

    if (callId === 3) {
      if (objectContext) {
        if ((objectContext as any).isMeetingHud())
          return RpcClearVote_V2018_11_14_0.deserializeContents(reader, netId);

        if ((objectContext as any).isPlayerControl())
          return RpcSetInfected_V2018_11_14_0.deserializeContents(reader, netId);

        throw new Error("Unknown Object Kind");
      }

      if (reader.countRemainingBytes() === 0)
        return RpcClearVote_V2018_11_14_0.deserializeContents(reader, netId);

      try {
        return RpcSetInfected_V2018_11_14_0.deserializeContents(reader, netId);
      } catch (err) {
        throw new Error("Failed to infer NetObjectKind for Rpc packet.")
      }
    }

    if (objectContext?.isMeetingHud())
      throw new Error("Unknown RPC " + callId + " on MeetingHud");

    if (objectContext && !objectContext.isPlayerControl())
      throw new Error("Unknown Object Kind");

    switch(callId) {
      case 4: return RpcExiled_V2018_11_14_0.deserializeContents(reader, netId);
      case 5: return RpcCheckName_V2018_11_14_0.deserializeContents(reader, netId);
      case 6: return RpcSetName_V2018_11_14_0.deserializeContents(reader, netId);
      case 7: return RpcCheckColor_V2018_11_14_0.deserializeContents(reader, netId);
      case 8: return RpcSetColor_V2018_11_14_0.deserializeContents(reader, netId);
      case 9: return RpcSetHat_V2018_11_14_0.deserializeContents(reader, netId);
      case 10: return RpcReportDeadBody_V2018_11_14_0.deserializeContents(reader, netId);
      case 11: return RpcMurderPlayer_V2018_11_14_0.deserializeContents(reader, netId);
      case 12: return RpcSendChat_V2018_11_14_0.deserializeContents(reader, netId);
      case 13: return RpcSetTimesImpostor_V2018_11_14_0.deserializeContents(reader, netId);
      case 14: return RpcReady_V2018_11_14_0.deserializeContents(reader, netId);
      case 15: return RpcStartMeeting_V2018_11_14_0.deserializeContents(reader, netId);

      default:
        throw new Error(`Unknown callId ${callId}`)
    }
  }

  constructor(
    protected readonly netId: number
  ) { super() }

  isAmbigous(): this is GameObjectAmbigousRpc { return false }

  isRpcCastVote(): this is RpcCastVote { return false; }
  isRpcCheckColor(): this is RpcCheckColor { return false; }
  isRpcCheckName(): this is RpcCheckName { return false; }
  isRpcClearVote(): this is RpcClearVote { return false; }
  isRpcClose(): this is RpcClose { return false; }
  isRpcCloseDoorsOfType(): this is RpcCloseDoorsOfType { return false; }
  isRpcCompleteTask(): this is RpcCompleteTask { return false; }
  isRpcEnterVent(): this is RpcEnterVent { return false; }
  isRpcExitAllVents(): this is RpcExitAllVents { return false; }
  isRpcExitVent(): this is RpcExitVent { return false; }
  isRpcMurderPlayer(): this is RpcMurderPlayer { return false; }
  isRpcPlayAnimation(): this is RpcPlayAnimation { return false; }
  isRpcReady(): this is RpcReady { return false; }
  isRpcRepairSystem(): this is RpcRepairSystem { return false; }
  isRpcReportDeadBody(): this is RpcReportDeadBody { return false; }
  isRpcSendChat(): this is RpcSendChat { return false; }
  isRpcSetColor(): this is RpcSetColor { return false; }
  isRpcSetHat(): this is RpcSetHat { return false; }
  isRpcSetInfected(): this is RpcSetInfected { return false; }
  isRpcSetName(): this is RpcSetName { return false; }
  isRpcSetTimesImpostor(): this is RpcSetTimesImpostor { return false; }
  isRpcSetTasks(): this is RpcSetTasks { return false; }
  isRpcSnapTo(): this is RpcSnapTo { return false; }
  isRpcStartMeeting(): this is RpcStartMeeting { return false; }
  isRpcSyncSettings(): this is RpcSyncSettings { return false; }
  isRpcVotingComplete(): this is RpcVotingComplete { return false; }
  isRpcExiled(): this is RpcExiled { return false; }

  getNetId() {
    return this.netId;
  }

  abstract serializeContents(): BinaryWriter;
  abstract getCallId(): number;

  serialize(): MessageWriter {
    const content = this.serializeContents().getBuffer().buffer;
    const writer = MessageWriter.allocateTagged(2, content.byteLength + 7);

    writer.writePackedUInt32(this.getNetId());
    writer.writeUInt8(this.getCallId());
    writer.writeBytes(content);

    return writer;
  }
}
