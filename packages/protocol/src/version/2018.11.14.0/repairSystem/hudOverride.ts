import { RepairSystemHudOverride, RepairSystemHudOverrideResolve, RepairSystemHudOverrideSabotage } from "../../abstract/repairSystem/hudOverride";
import { RpcRepairSystem } from "../../abstract/rpc/repairSystem";
import { RpcRepairSystem_V2018_11_14_0 } from "../rpc/repairSystem";

export abstract class RepairSystemHudOverride_V2018_11_14_0 extends RpcRepairSystem_V2018_11_14_0 implements RepairSystemHudOverride {
  static fromAbstract(data: RepairSystemHudOverride): RepairSystemHudOverride_V2018_11_14_0 {
    if ((data as any).isRepairSystemHudOverrideResolve())
      return RepairSystemHudOverrideResolve_V2018_11_14_0.fromAbstract(data as any);

    if ((data as any).isRepairSystemHudOverrideSabotage())
      return RepairSystemHudOverrideSabotage_V2018_11_14_0.fromAbstract(data as any);

    throw new Error(`Unknown RepairSystemHudOverride state`);
  }

  static deserializeAmount(amount: number, playerControlNetId: number, senderNetId: number) {
    const sabotageFlag = amount & 0b1000_0000;
    const otherData = amount & 0b0111_1111;

    if (otherData !== 0)
      throw new Error(`RepairSystemHudOverride amount (${amount}) is invalid. There is unused data in 0b0111_1111.`)
  
    if (sabotageFlag)
      return new RepairSystemHudOverrideSabotage_V2018_11_14_0(senderNetId, playerControlNetId);

    return new RepairSystemHudOverrideResolve_V2018_11_14_0(senderNetId, playerControlNetId);
  }

  isRepairSystemHudOverride(): this is RepairSystemHudOverride {
    return true;
  }

  isRepairSystemHudOverrideResolve(): this is RepairSystemHudOverrideResolve {
    return false;
  }

  isRepairSystemHudOverrideSabotage(): this is RepairSystemHudOverrideSabotage {
    return false;
  }
}

export class RepairSystemHudOverrideSabotage_V2018_11_14_0 extends RepairSystemHudOverride_V2018_11_14_0 implements RepairSystemHudOverrideSabotage {
  static fromAbstract(data: RepairSystemHudOverrideSabotage): RepairSystemHudOverrideSabotage_V2018_11_14_0 {
    return new RepairSystemHudOverrideSabotage_V2018_11_14_0(data.getNetId(), data.getRepairerPlayerControlNetId());
  }

  isRepairSystemHudOverrideSabotage(): this is RepairSystemHudOverrideSabotage {
    return true;
  }

  serializeAmount() { return 0b1000_0000 }
}

export class RepairSystemHudOverrideResolve_V2018_11_14_0 extends RepairSystemHudOverride_V2018_11_14_0 implements RepairSystemHudOverrideResolve {
  static fromAbstract(data: RepairSystemHudOverrideResolve): RepairSystemHudOverrideResolve_V2018_11_14_0 {
    return new RepairSystemHudOverrideResolve_V2018_11_14_0(data.getNetId(), data.getRepairerPlayerControlNetId());
  }

  isRepairSystemHudOverrideResolve(): this is RepairSystemHudOverrideResolve {
    return true;
  }

  serializeAmount() { return 0b0000_0000 }
}
