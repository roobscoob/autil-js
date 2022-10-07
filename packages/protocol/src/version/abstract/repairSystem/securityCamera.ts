import { RpcRepairSystem } from "../rpc/repairSystem";

export abstract class RepairSystemSecurityCamera extends RpcRepairSystem {
  isRepairSystemSecurityCamera(): this is RepairSystemSecurityCamera { return false }
  isRepairSystemSecurityCameraStopUsing(): this is RepairSystemSecurityCameraStopUsing { return false }
  isRepairSystemSecurityCameraStartUsing(): this is RepairSystemSecurityCameraStartUsing { return false }
}

export abstract class RepairSystemSecurityCameraStopUsing extends RepairSystemSecurityCamera {
  isRepairSystemSecurityCameraStopUsing(): this is RepairSystemSecurityCameraStopUsing { return true }
}

export abstract class RepairSystemSecurityCameraStartUsing extends RepairSystemSecurityCamera {
  isRepairSystemSecurityCameraStartUsing(): this is RepairSystemSecurityCameraStartUsing { return true }
}

export class RepairSystemSecurityCameraStopUsingData extends RepairSystemSecurityCameraStopUsing {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
  ) { super() }

  getNetId() { return this.netId }

  getRepairerPlayerControlNetId(): number {
    return this.repairerPlayerControlNetId;
  }
}

export class RepairSystemSecurityCameraStartUsingData extends RepairSystemSecurityCameraStartUsing {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
  ) { super() }

  getNetId() { return this.netId }

  getRepairerPlayerControlNetId(): number {
    return this.repairerPlayerControlNetId;
  }
}
