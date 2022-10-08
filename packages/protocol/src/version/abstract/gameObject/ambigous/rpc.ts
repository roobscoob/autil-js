import { GameObject } from "../../rootPackets/gameObject"
import { RpcCastVote } from "../../rpc/castVote"
import { RpcCheckColor } from "../../rpc/checkColor"
import { RpcCheckName } from "../../rpc/checkName"
import { RpcClearVote } from "../../rpc/clearVote"
import { RpcClose } from "../../rpc/close"
import { RpcCloseDoorsOfType } from "../../rpc/closeDoorsOfType"
import { RpcCompleteTask } from "../../rpc/completeTask"
import { RpcEnterVent } from "../../rpc/enterVent"
import { RpcExitAllVents } from "../../rpc/exitAllVents"
import { RpcExitVent } from "../../rpc/exitVent"
import { RpcMurderPlayer } from "../../rpc/murderPlayer"
import { RpcPlayAnimation } from "../../rpc/playAnimation"
import { RpcReady } from "../../rpc/ready"
import { RpcRepairSystem } from "../../rpc/repairSystem"
import { RpcReportDeadBody } from "../../rpc/reportDeadBody"
import { RpcSendChat } from "../../rpc/sendChat"
import { RpcSetColor } from "../../rpc/setColor"
import { RpcSetHat } from "../../rpc/setHat"
import { RpcSetInfected } from "../../rpc/setInfected"
import { RpcSetName } from "../../rpc/setName"
import { RpcSetTasks } from "../../rpc/setTasks"
import { RpcSetTimesImpostor } from "../../rpc/setTimesImpostor"
import { RpcSnapTo } from "../../rpc/snapTo"
import { RpcStartMeeting } from "../../rpc/startMeeting"
import { RpcSyncSettings } from "../../rpc/syncSettings"
import { RpcVotingComplete } from "../../rpc/votingComplete"

type Possibilities = 
  RpcCastVote |
  RpcCheckColor |
  RpcCheckName |
  RpcClearVote |
  RpcClose |
  RpcCloseDoorsOfType |
  RpcCompleteTask |
  RpcCompleteTask |
  RpcEnterVent |
  RpcExitAllVents |
  RpcExitVent |
  RpcMurderPlayer |
  RpcPlayAnimation |
  RpcReady |
  RpcRepairSystem |
  RpcReportDeadBody |
  RpcSendChat |
  RpcSetColor |
  RpcSetHat |
  RpcSetInfected |
  RpcSetName |
  RpcSetTasks |
  RpcSetTimesImpostor |
  RpcSnapTo |
  RpcStartMeeting |
  RpcSyncSettings |
  RpcVotingComplete

export abstract class GameObjectAmbigousRpc<T extends Possibilities[] = Possibilities[]> extends GameObject {
  isAmbigous(): this is GameObjectAmbigousRpc { return true }

  abstract getNetId(): number;
  abstract getPossibilities(): T;

  abstract asCastVote(): RpcCastVote | undefined;
  abstract asCheckColor(): RpcCheckColor | undefined;
  abstract asCheckName(): RpcCheckName | undefined;
  abstract asClearVote(): RpcClearVote | undefined;
  abstract asClose(): RpcClose | undefined;
  abstract asCloseDoorsOfType(): RpcCloseDoorsOfType | undefined;
  abstract asCompleteTask(): RpcCompleteTask | undefined;
  abstract asCompleteTask(): RpcCompleteTask | undefined;
  abstract asEnterVent(): RpcEnterVent | undefined;
  abstract asExitAllVents(): RpcExitAllVents | undefined;
  abstract asExitVent(): RpcExitVent | undefined;
  abstract asMurderPlayer(): RpcMurderPlayer | undefined;
  abstract asPlayAnimation(): RpcPlayAnimation | undefined;
  abstract asReady(): RpcReady | undefined;
  abstract asRepairSystem(): RpcRepairSystem | undefined;
  abstract asReportDeadBody(): RpcReportDeadBody | undefined;
  abstract asSendChat(): RpcSendChat | undefined;
  abstract asSetColor(): RpcSetColor | undefined;
  abstract asSetHat(): RpcSetHat | undefined;
  abstract asSetInfected(): RpcSetInfected | undefined;
  abstract asSetName(): RpcSetName | undefined;
  abstract asSetTasks(): RpcSetTasks | undefined;
  abstract asSetTimesImpostor(): RpcSetTimesImpostor | undefined;
  abstract asSnapTo(): RpcSnapTo | undefined;
  abstract asStartMeeting(): RpcStartMeeting | undefined;
  abstract asSyncSettings(): RpcSyncSettings | undefined;
  abstract asVotingComplete(): RpcVotingComplete | undefined;
}
