import { GameObjectRpc } from "../gameObject/rpc";
import { RepairSystemReactor } from "../repairSystem/reactor";
import { RepairSystemMedbay } from "../repairSystem/medbay";
import { RepairSystemSecurityCamera } from "../repairSystem/securityCamera";
import type { RepairSystemSwitch } from "../repairSystem/switch";
import { RepairSystemHudOverride } from "../repairSystem/hudOverride";

export abstract class RpcRepairSystem extends GameObjectRpc {
  isRpcRepairSystem(): this is RpcRepairSystem {
    return true;
  }

  abstract getRepairerPlayerControlNetId(): number;

  isRepairSystemSwitch(): this is RepairSystemSwitch { return false }
  isRepairSystemMedbay(): this is RepairSystemMedbay { return false }
  isRepairSystemReactor(): this is RepairSystemReactor { return false }
  isRepairSystemSecurityCamera(): this is RepairSystemSecurityCamera { return false }
  isRepairSystemHudOverride(): this is RepairSystemHudOverride { return false }
}
