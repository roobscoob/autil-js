import { GameObject } from "../rootPackets/gameObject";
import type { RpcCastVote } from "../rpc/castVote";
import type { RpcCheckColor } from "../rpc/checkColor";
import type { RpcCheckName } from "../rpc/checkName";
import type { RpcClearVote } from "../rpc/clearVote";
import type { RpcClose } from "../rpc/close";
import type { RpcCloseDoorsOfType } from "../rpc/closeDoorsOfType";
import type { RpcCompleteTask } from "../rpc/completeTask";
import type { RpcEnterVent } from "../rpc/enterVent";
import type { RpcExiled } from "../rpc/exiled";
import type { RpcExitAllVents } from "../rpc/exitAllVents";
import type { RpcExitVent } from "../rpc/exitVent";
import type { RpcMurderPlayer } from "../rpc/murderPlayer";
import type { RpcPlayAnimation } from "../rpc/playAnimation";
import type { RpcReady } from "../rpc/ready";
import type { RpcRepairSystem } from "../rpc/repairSystem";
import type { RpcReportDeadBody } from "../rpc/reportDeadBody";
import type { RpcSendChat } from "../rpc/sendChat";
import type { RpcSetColor } from "../rpc/setColor";
import type { RpcSetHat } from "../rpc/setHat";
import type { RpcSetInfected } from "../rpc/setInfected";
import type { RpcSetName } from "../rpc/setName";
import type { RpcSetTasks } from "../rpc/setTasks";
import type { RpcSetTimesImpostor } from "../rpc/setTimesImpostor";
import type { RpcSnapTo } from "../rpc/snapTo";
import type { RpcStartMeeting } from "../rpc/startMeeting";
import type { RpcSyncSettings } from "../rpc/syncSettings";
import type { RpcVotingComplete } from "../rpc/votingComplete";

export abstract class GameObjectRpc extends GameObject {
  abstract getNetId(): number;

  isRpc(): this is GameObjectRpc { return true }

  isRpcSnapTo(): this is RpcSnapTo { return false }
  isRpcSetTasks(): this is RpcSetTasks { return false }
  isRpcVotingComplete(): this is RpcVotingComplete { return false }
  isRpcCompleteTask(): this is RpcCompleteTask { return false }
  isRpcPlayAnimation(): this is RpcPlayAnimation { return false }
  isRpcSetColor(): this is RpcSetColor { return false }
  isRpcSetHat(): this is RpcSetHat { return false }
  isRpcSetInfected(): this is RpcSetInfected { return false }
  isRpcSetName(): this is RpcSetName { return false }
  isRpcSetTimesImpostor(): this is RpcSetTimesImpostor { return false }
  isRpcSyncSettings(): this is RpcSyncSettings { return false }
  isRpcEnterVent(): this is RpcEnterVent { return false }
  isRpcExitVent(): this is RpcExitVent { return false }
  isRpcClose(): this is RpcClose { return false }
  isRpcReady(): this is RpcReady { return false }
  isRpcExitAllVents(): this is RpcExitAllVents { return false }
  isRpcCastVote(): this is RpcCastVote { return false }
  isRpcClearVote(): this is RpcClearVote { return false }
  isRpcCheckColor(): this is RpcCheckColor { return false }
  isRpcCheckName(): this is RpcCheckName { return false }
  isRpcReportDeadBody(): this is RpcReportDeadBody { return false }
  isRpcMurderPlayer(): this is RpcMurderPlayer { return false }
  isRpcSendChat(): this is RpcSendChat { return false }
  isRpcStartMeeting(): this is RpcStartMeeting { return false }
  isRpcCloseDoorsOfType(): this is RpcCloseDoorsOfType { return false }
  isRpcRepairSystem(): this is RpcRepairSystem { return false }
  isRpcExiled(): this is RpcExiled { return false }
}
