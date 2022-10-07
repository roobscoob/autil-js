import { RpcRepairSystem } from "../rpc/repairSystem";

export abstract class RepairSystemHudOverride extends RpcRepairSystem {
  isRepairSystemHudOverride(): this is RepairSystemHudOverride {
    return true;
  }

  isRepairSystemHudOverrideSabotage(): this is RepairSystemHudOverrideSabotage { return false }
  isRepairSystemHudOverrideResolve(): this is RepairSystemHudOverrideResolve { return false }
}

export abstract class RepairSystemHudOverrideSabotage extends RepairSystemHudOverride {
  isRepairSystemHudOverrideSabotage(): this is RepairSystemHudOverrideSabotage {
    return true;
  }
}

export abstract class RepairSystemHudOverrideResolve extends RepairSystemHudOverride {
  isRepairSystemHudOverrideResolve(): this is RepairSystemHudOverrideResolve {
    return true;
  }
}

export class RepairSystemHudOverrideSabotageData extends RepairSystemHudOverrideSabotage {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
  ) { super() }

  getNetId() { return this.netId }
  getRepairerPlayerControlNetId(): number {
    return this.repairerPlayerControlNetId;
  }
}

export class RepairSystemHudOverrideResolveData extends RepairSystemHudOverrideResolve {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
  ) { super() }

  getNetId() { return this.netId }
  getRepairerPlayerControlNetId(): number {
    return this.repairerPlayerControlNetId;
  }
}
