import { RpcRepairSystem } from "../rpc/repairSystem";

export abstract class RepairSystemReactor extends RpcRepairSystem {
  isRepairSystemReactor(): this is RepairSystemReactor {
    return true;
  }

  abstract getConsoleId(): number;

  isRepairSystemReactorSabotage(): this is RepairSystemReactorSabotage { return false }
  isRepairSystemReactorResolved(): this is RepairSystemReactorResolved { return false }
  isRepairSystemReactorUserJoin(): this is RepairSystemReactorUserJoin { return false }
  isRepairSystemReactorUserLeave(): this is RepairSystemReactorUserLeave { return false }
}

export abstract class RepairSystemReactorSabotage extends RepairSystemReactor {
  isRepairSystemReactorSabotage(): this is RepairSystemReactorSabotage { return true }
}

export abstract class RepairSystemReactorResolved extends RepairSystemReactor {
  isRepairSystemReactorResolved(): this is RepairSystemReactorResolved { return true }
}

export abstract class RepairSystemReactorUserJoin extends RepairSystemReactor {
  isRepairSystemReactorUserJoin(): this is RepairSystemReactorUserJoin { return true }
}

export abstract class RepairSystemReactorUserLeave extends RepairSystemReactor {
  isRepairSystemReactorUserLeave(): this is RepairSystemReactorUserLeave { return true }
}

export class RepairSystemReactorSabotageData extends RepairSystemReactorSabotage {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
    protected readonly consoleId: number = 0,
  ) { super() }

  getNetId() { return this.netId }

  getConsoleId() {
    return this.consoleId;
  }

  getRepairerPlayerControlNetId() {
    return this.repairerPlayerControlNetId;
  }
}

export class RepairSystemReactorResolvedData extends RepairSystemReactorResolved {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
    protected readonly consoleId: number = 0,
  ) { super() }

  getNetId() { return this.netId }

  getConsoleId() {
    return this.consoleId;
  }

  getRepairerPlayerControlNetId() {
    return this.repairerPlayerControlNetId;
  }
}

export class RepairSystemReactorUserJoinData extends RepairSystemReactorUserJoin {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
    protected readonly consoleId: number,
  ) { super() }

  getNetId() { return this.netId }

  getConsoleId() {
    return this.consoleId;
  }

  getRepairerPlayerControlNetId() {
    return this.repairerPlayerControlNetId;
  }
}

export class RepairSystemReactorUserLeaveData extends RepairSystemReactorUserLeave {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
    protected readonly consoleId: number,
  ) { super() }

  getNetId() { return this.netId }

  getConsoleId() {
    return this.consoleId;
  }

  getRepairerPlayerControlNetId() {
    return this.repairerPlayerControlNetId;
  }
}
