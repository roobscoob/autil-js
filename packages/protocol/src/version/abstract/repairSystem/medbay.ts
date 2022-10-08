import { RpcRepairSystem } from "../rpc/repairSystem";

export abstract class RepairSystemMedbay extends RpcRepairSystem {
  isRepairSystemMedbay(): this is RepairSystemMedbay {
    return true;
  }

  abstract getPlayerId(): number;

  isRepairSystemMedbayDequeue(): this is RepairSystemMedbayDequeue { return false }
  isRepairSystemMedbayQueue(): this is RepairSystemMedbayQueue { return false }
}

export abstract class RepairSystemMedbayDequeue extends RepairSystemMedbay {
  isRepairSystemMedbayDequeue(): this is RepairSystemMedbayDequeue {
    return true;
  }
}

export abstract class RepairSystemMedbayQueue extends RepairSystemMedbay {
  isRepairSystemMedbayQueue(): this is RepairSystemMedbayQueue {
    return true;
  }
}

export class RepairSystemMedbayDequeueData extends RepairSystemMedbayDequeue {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
    protected readonly playerId: number,
  ) { super() }

  getNetId() { return this.netId }

  getPlayerId() {
    return this.playerId;
  }

  getRepairerPlayerControlNetId() {
    return this.repairerPlayerControlNetId;
  }
}

export class RepairSystemMedbayQueueData extends RepairSystemMedbayQueue {
  constructor(
    protected readonly netId: number,
    protected readonly repairerPlayerControlNetId: number,
    protected readonly playerId: number,
  ) { super() }

  getNetId() { return this.netId }

  getPlayerId() {
    return this.playerId;
  }

  getRepairerPlayerControlNetId() {
    return this.repairerPlayerControlNetId;
  }
}
