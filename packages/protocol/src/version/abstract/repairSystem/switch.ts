import { RpcRepairSystem } from "../rpc/repairSystem";
import { Switches } from "../types/switches";

export abstract class RepairSystemSwitch extends RpcRepairSystem {
  isRepairSystemSwitch(): this is RepairSystemSwitch {
    return true;
  }

  isRepairSystemSwitchFlip(): this is RepairSystemSwitchFlip { return false }
  isRepairSystemSwitchSabotage(): this is RepairSystemSwitchSabotage { return false }
}

export abstract class RepairSystemSwitchFlip extends RepairSystemSwitch {
  isRepairSystemSwitchFlip(): this is RepairSystemSwitchFlip { return true }

  abstract getSwitchIndex(): number;
}

export abstract class RepairSystemSwitchSabotage extends RepairSystemSwitch {
  isRepairSystemSwitchSabotage(): this is RepairSystemSwitchSabotage { return true }

  abstract getFlipState(): Switches;
}

export class RepairSystemSwitchFlipData extends RepairSystemSwitchFlip {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
    protected readonly switchIndex: number,
  ) { super() }

  getNetId() { return this.netId }

  getRepairerPlayerControlNetId(): number {
    return this.repairerPlayerControlNetId;
  }

  getSwitchIndex(): number {
    return this.switchIndex
  }
}

export class RepairSystemSwitchSabotageData extends RepairSystemSwitchSabotage {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
    protected readonly flipState: Switches,
  ) { super() }

  getNetId() { return this.netId }

  getRepairerPlayerControlNetId(): number {
    return this.repairerPlayerControlNetId;
  }

  getFlipState() {
    return this.flipState
  }
}
