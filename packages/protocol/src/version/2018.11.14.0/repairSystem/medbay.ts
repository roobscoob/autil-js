import { RepairSystemMedbay, RepairSystemMedbayDequeue, RepairSystemMedbayQueue } from "../../abstract/repairSystem/medbay";
import { RpcRepairSystem } from "../../abstract/rpc/repairSystem";
import { RpcRepairSystem_V2018_11_14_0 } from "../rpc/repairSystem";

export abstract class RepairSystemMedbay_V2018_11_14_0 extends RpcRepairSystem_V2018_11_14_0 implements RepairSystemMedbay {
  static fromAbstract(data: RepairSystemMedbay): RepairSystemMedbay_V2018_11_14_0 {
    if ((data as any).isRepairSystemMedbayQueue())
      return RepairSystemMedbayQueue_V2018_11_14_0.fromAbstract(data);

    if ((data as any).isRepairSystemMedbayDequeue())
      return RepairSystemMedbayDequeue_V2018_11_14_0.fromAbstract(data);

    throw new Error(`Unknown RepairSystemMedbay state`);
  }

  static deserializeAmount(amount: number, playerControlNetId: number, senderNetId: number) {
    const queueFlag =   amount & 0b1000_0000;
    const dequeueFlag = amount & 0b0100_0000;
    const unusedFlag =  amount & 0b0010_0000;
    const playerId =    amount & 0b0001_1111;

    if (unusedFlag)
      throw new Error(`RepairSystemMedbay amount (${amount}) is invalid. The unused flag 0b0010_0000 is set.`);

    if (queueFlag && dequeueFlag)
      throw new Error(`RepairSystemMedbay amount (${amount}) is invalid. Both the queue and dequeue flag are set.`);

    if (queueFlag)
      return new RepairSystemMedbayQueue_V2018_11_14_0(senderNetId, playerControlNetId, playerId);

    if (dequeueFlag)
      return new RepairSystemMedbayDequeue_V2018_11_14_0(senderNetId, playerControlNetId, playerId);

    throw new Error(`RepairSystemMedbay amount (${amount}) is invalid. Missing both a queue flag and a dequeue flag.`);
  }

  constructor(senderNetId: number, repairerPlayerControlNetId: number, protected readonly playerId: number) { super(senderNetId, repairerPlayerControlNetId) }

  isRepairSystemMedbay(): this is RepairSystemMedbay {
    return true;
  }

  isRepairSystemMedbayQueue(): this is RepairSystemMedbayQueue {
    return false;
  }

  isRepairSystemMedbayDequeue(): this is RepairSystemMedbayDequeue {
    return false;
  }

  getPlayerId() { return this.playerId }
}

export class RepairSystemMedbayQueue_V2018_11_14_0 extends RepairSystemMedbay_V2018_11_14_0 implements RepairSystemMedbayQueue {
  static fromAbstract(data: RepairSystemMedbayQueue): RepairSystemMedbayQueue_V2018_11_14_0 {
    return new RepairSystemMedbayQueue_V2018_11_14_0(
      data.getNetId(),
      data.getRepairerPlayerControlNetId(),
      data.getPlayerId(),
    )
  }

  constructor(
    senderNetId: number,
    repairerPlayerControlNetId: number,
    playerId: number,
  ) { super(senderNetId, repairerPlayerControlNetId, playerId) }

  isRepairSystemMedbayQueue(): this is RepairSystemMedbayQueue {
    return true;
  }

  serializeAmount(): number {
    return 0b1000_0000 + (this.getPlayerId() & 0b0001_1111);
  }
}

export class RepairSystemMedbayDequeue_V2018_11_14_0 extends RepairSystemMedbay_V2018_11_14_0 implements RepairSystemMedbayDequeue {
  static fromAbstract(data: RepairSystemMedbayDequeue): RepairSystemMedbayDequeue_V2018_11_14_0 {
    return new RepairSystemMedbayDequeue_V2018_11_14_0(
      data.getNetId(),
      data.getRepairerPlayerControlNetId(),
      data.getPlayerId(),
    )
  }

  constructor(
    senderNetId: number,
    repairerPlayerControlNetId: number,
    playerId: number,
  ) { super(senderNetId, repairerPlayerControlNetId, playerId) }

  isRepairSystemMedbayDequeue(): this is RepairSystemMedbayDequeue {
    return true;
  }

  serializeAmount(): number {
    return 0b0100_0000 + (this.getPlayerId() & 0b0001_1111);
  }
}
