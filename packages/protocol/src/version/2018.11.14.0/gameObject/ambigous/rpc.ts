import { MessageWriter } from "@autil/hazel";
import { GameObjectAmbigousRpc } from "../../../abstract/gameObject/ambigous/rpc";
import { GameObjectRpc } from "../../../abstract/gameObject/rpc";
import { RpcCastVote } from "../../../abstract/rpc/castVote";
import { RpcCheckColor } from "../../../abstract/rpc/checkColor";
import { RpcCheckName } from "../../../abstract/rpc/checkName";
import { RpcClearVote } from "../../../abstract/rpc/clearVote";
import { RpcClose } from "../../../abstract/rpc/close";
import { RpcCloseDoorsOfType } from "../../../abstract/rpc/closeDoorsOfType";
import { RpcCompleteTask } from "../../../abstract/rpc/completeTask";
import { RpcEnterVent } from "../../../abstract/rpc/enterVent";
import { RpcExitAllVents } from "../../../abstract/rpc/exitAllVents";
import { RpcExitVent } from "../../../abstract/rpc/exitVent";
import { RpcMurderPlayer } from "../../../abstract/rpc/murderPlayer";
import { RpcPlayAnimation } from "../../../abstract/rpc/playAnimation";
import { RpcReady } from "../../../abstract/rpc/ready";
import { RpcRepairSystem } from "../../../abstract/rpc/repairSystem";
import { RpcReportDeadBody } from "../../../abstract/rpc/reportDeadBody";
import { RpcSendChat } from "../../../abstract/rpc/sendChat";
import { RpcSetColor } from "../../../abstract/rpc/setColor";
import { RpcSetHat } from "../../../abstract/rpc/setHat";
import { RpcSetInfected } from "../../../abstract/rpc/setInfected";
import { RpcSetName } from "../../../abstract/rpc/setName";
import { RpcSetTasks } from "../../../abstract/rpc/setTasks";
import { RpcSetTimesImpostor } from "../../../abstract/rpc/setTimesImpostor";
import { RpcSnapTo } from "../../../abstract/rpc/snapTo";
import { RpcStartMeeting } from "../../../abstract/rpc/startMeeting";
import { RpcSyncSettings } from "../../../abstract/rpc/syncSettings";
import { RpcVotingComplete } from "../../../abstract/rpc/votingComplete";
import { GameObject_V2018_11_14_0 } from "../../rootPackets/gameObject";
import { RpcCastVote_V2018_11_14_0 } from "../../rpc/castVote";
import { RpcCheckColor_V2018_11_14_0 } from "../../rpc/checkColor";
import { RpcCheckName_V2018_11_14_0 } from "../../rpc/checkName";
import { RpcClearVote_V2018_11_14_0 } from "../../rpc/clearVote";
import { RpcClose_V2018_11_14_0 } from "../../rpc/close";
import { RpcCloseDoorsOfType_V2018_11_14_0 } from "../../rpc/closeDoorsOfType";
import { RpcGameDataCompleteTask_V2018_11_14_0, RpcPlayerControlCompleteTask_V2018_11_14_0 } from "../../rpc/completeTask";
import { RpcEnterVent_V2018_11_14_0 } from "../../rpc/enterVent";
import { RpcExitAllVents_V2018_11_14_0 } from "../../rpc/exitAllVents";
import { RpcExitVent_V2018_11_14_0 } from "../../rpc/exitVent";
import { RpcMurderPlayer_V2018_11_14_0 } from "../../rpc/murderPlayer";
import { RpcPlayAnimation_V2018_11_14_0 } from "../../rpc/playAnimation";
import { RpcReady_V2018_11_14_0 } from "../../rpc/ready";
import { RpcRepairSystem_V2018_11_14_0 } from "../../rpc/repairSystem";
import { RpcReportDeadBody_V2018_11_14_0 } from "../../rpc/reportDeadBody";
import { RpcSendChat_V2018_11_14_0 } from "../../rpc/sendChat";
import { RpcSetColor_V2018_11_14_0 } from "../../rpc/setColor";
import { RpcSetHat_V2018_11_14_0 } from "../../rpc/setHat";
import { RpcSetInfected_V2018_11_14_0 } from "../../rpc/setInfected";
import { RpcSetName_V2018_11_14_0 } from "../../rpc/setName";
import { RpcSetTasks_V2018_11_14_0 } from "../../rpc/setTasks";
import { RpcSetTimesImpostor_V2018_11_14_0 } from "../../rpc/setTimesImpostor";
import { RpcSnapTo_V2018_11_14_0 } from "../../rpc/snapTo";
import { RpcStartMeeting_V2018_11_14_0 } from "../../rpc/startMeeting";
import { RpcSyncSettings_V2018_11_14_0 } from "../../rpc/syncSettings";
import { RpcVotingComplete_V2018_11_14_0 } from "../../rpc/votingComplete";
import { GameObjectRpc_V2018_11_14_0 } from "../rpc";

type Possibilities =
  RpcClose_V2018_11_14_0 |
  RpcCloseDoorsOfType_V2018_11_14_0 |
  RpcEnterVent_V2018_11_14_0 |
  RpcPlayAnimation_V2018_11_14_0 |
  RpcSetTasks_V2018_11_14_0 |
  RpcSnapTo_V2018_11_14_0 

export class GameObjectAmbigousRpc_V2018_11_14_0<T extends Possibilities[] = Possibilities[]> extends GameObject_V2018_11_14_0 implements GameObjectAmbigousRpc<T> {
  static fromAbstract(data: GameObjectAmbigousRpc): GameObjectAmbigousRpc_V2018_11_14_0 {
    return new GameObjectAmbigousRpc_V2018_11_14_0(
      data.getNetId(),
      data.getPossibilities().map(p => GameObjectRpc_V2018_11_14_0.fromAbstract(p) as any).filter(v => !(v instanceof GameObjectAmbigousRpc_V2018_11_14_0)),
    )
  }

  static fromChocies<T extends Possibilities[]>(netId: number, ...choices: T): GameObjectAmbigousRpc_V2018_11_14_0<T> {
    return new GameObjectAmbigousRpc_V2018_11_14_0(netId, choices);
  }

  constructor(
    protected readonly netId: number,
    protected readonly choices: T,
  ) { super() }

  isAmbigous(): this is GameObjectAmbigousRpc { return true }

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

  getNetId() { return this.netId }
  getPossibilities() { return this.choices }

  asClose() { return this.getPossibilities().find(p => p instanceof RpcClose_V2018_11_14_0) as RpcClose_V2018_11_14_0 | undefined }
  asCloseDoorsOfType() { return this.getPossibilities().find(p => p instanceof RpcCloseDoorsOfType_V2018_11_14_0) as RpcCloseDoorsOfType_V2018_11_14_0 | undefined }
  asEnterVent() { return this.getPossibilities().find(p => p instanceof RpcEnterVent_V2018_11_14_0) as RpcEnterVent_V2018_11_14_0 | undefined }
  asPlayAnimation() { return this.getPossibilities().find(p => p instanceof RpcPlayAnimation_V2018_11_14_0) as RpcPlayAnimation_V2018_11_14_0 | undefined }
  asSetTasks() { return this.getPossibilities().find(p => p instanceof RpcSetTasks_V2018_11_14_0) as RpcSetTasks_V2018_11_14_0 | undefined }
  asSnapTo() { return this.getPossibilities().find(p => p instanceof RpcSnapTo_V2018_11_14_0) as RpcSnapTo_V2018_11_14_0 | undefined }
  asCompleteTask() { return this.getPossibilities().find(p => p instanceof RpcGameDataCompleteTask_V2018_11_14_0 || p instanceof RpcPlayerControlCompleteTask_V2018_11_14_0) as RpcGameDataCompleteTask_V2018_11_14_0 | RpcPlayerControlCompleteTask_V2018_11_14_0 | undefined }
  asVotingComplete() { return this.getPossibilities().find(p => p instanceof RpcVotingComplete_V2018_11_14_0) as RpcVotingComplete_V2018_11_14_0 | undefined }
  asExitVent() { return this.getPossibilities().find(p => p instanceof RpcExitVent_V2018_11_14_0) as RpcExitVent_V2018_11_14_0 | undefined }
  asRepairSystem() { return this.getPossibilities().find(p => p instanceof RpcRepairSystem_V2018_11_14_0) as RpcRepairSystem_V2018_11_14_0 | undefined }
  asCastVote() { return this.getPossibilities().find(p => p instanceof RpcCastVote_V2018_11_14_0) as RpcCastVote_V2018_11_14_0 | undefined}
  asCheckColor() { return this.getPossibilities().find(p => p instanceof RpcCheckColor_V2018_11_14_0) as RpcCheckColor_V2018_11_14_0 | undefined}
  asCheckName() { return this.getPossibilities().find(p => p instanceof RpcCheckName_V2018_11_14_0) as RpcCheckName_V2018_11_14_0 | undefined}
  asClearVote() { return this.getPossibilities().find(p => p instanceof RpcClearVote_V2018_11_14_0) as RpcClearVote_V2018_11_14_0 | undefined}
  asExitAllVents() { return this.getPossibilities().find(p => p instanceof RpcExitAllVents_V2018_11_14_0) as RpcExitAllVents_V2018_11_14_0 | undefined}
  asMurderPlayer() { return this.getPossibilities().find(p => p instanceof RpcMurderPlayer_V2018_11_14_0) as RpcMurderPlayer_V2018_11_14_0 | undefined}
  asReady() { return this.getPossibilities().find(p => p instanceof RpcReady_V2018_11_14_0) as RpcReady_V2018_11_14_0 | undefined}
  asReportDeadBody() { return this.getPossibilities().find(p => p instanceof RpcReportDeadBody_V2018_11_14_0) as RpcReportDeadBody_V2018_11_14_0 | undefined}
  asSendChat() { return this.getPossibilities().find(p => p instanceof RpcSendChat_V2018_11_14_0) as RpcSendChat_V2018_11_14_0 | undefined}
  asSetColor() { return this.getPossibilities().find(p => p instanceof RpcSetColor_V2018_11_14_0) as RpcSetColor_V2018_11_14_0 | undefined}
  asSetHat() { return this.getPossibilities().find(p => p instanceof RpcSetHat_V2018_11_14_0) as RpcSetHat_V2018_11_14_0 | undefined}
  asSetInfected() { return this.getPossibilities().find(p => p instanceof RpcSetInfected_V2018_11_14_0) as RpcSetInfected_V2018_11_14_0 | undefined}
  asSetName() { return this.getPossibilities().find(p => p instanceof RpcSetName_V2018_11_14_0) as RpcSetName_V2018_11_14_0 | undefined}
  asSetTimesImpostor() { return this.getPossibilities().find(p => p instanceof RpcSetTimesImpostor_V2018_11_14_0) as RpcSetTimesImpostor_V2018_11_14_0 | undefined}
  asStartMeeting() { return this.getPossibilities().find(p => p instanceof RpcStartMeeting_V2018_11_14_0) as RpcStartMeeting_V2018_11_14_0 | undefined}
  asSyncSettings() { return this.getPossibilities().find(p => p instanceof RpcSyncSettings_V2018_11_14_0) as RpcSyncSettings_V2018_11_14_0 | undefined}

  serialize(): MessageWriter {
    throw new Error("Cannot serialize ambigous Rpcs");
  }
}
