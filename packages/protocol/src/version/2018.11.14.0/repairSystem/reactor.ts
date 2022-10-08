import { RepairSystemReactor, RepairSystemReactorResolved, RepairSystemReactorSabotage, RepairSystemReactorUserJoin, RepairSystemReactorUserLeave } from "../../abstract/repairSystem/reactor";
import { RpcRepairSystem_V2018_11_14_0 } from "../rpc/repairSystem";

export abstract class RepairSystemReactor_V2018_11_14_0 extends RpcRepairSystem_V2018_11_14_0 implements RepairSystemReactor {
  static fromAbstract(data: RepairSystemReactor): RepairSystemReactor_V2018_11_14_0 {
    if ((data as any).isRepairSystemReactorSabotage())
      return RepairSystemReactorSabotage_V2018_11_14_0.fromAbstract(data);

    if ((data as any).isRepairSystemReactorResolved())
      return RepairSystemReactorResolved_V2018_11_14_0.fromAbstract(data);

    if ((data as any).isRepairSystemReactorUserJoin())
      return RepairSystemReactorUserJoin_V2018_11_14_0.fromAbstract(data);

    if ((data as any).isRepairSystemReactorUserLeave())
      return RepairSystemReactorUserLeave_V2018_11_14_0.fromAbstract(data);

    throw new Error(`Unknown RepairSystemReactor state`);
  }

  static deserializeAmount(amount: number, playerControlNetId: number, senderNetId: number) {
    const sabotageFlag =   amount & 0b1000_0000;
    const userJoinFlag =   amount & 0b0100_0000;
    const userLeaveFlag =  amount & 0b0010_0000;
    const resolveFlag =    amount & 0b0001_0000;
    const unusedData =     amount & 0b0000_1100;
    const console =        amount & 0b0000_0011;

    if (unusedData !== 0)
      throw new Error(`RepairSystemReactor amount (${amount}) is invalid. There is data in unused bits 0b0000_1100.`);

    const flags = [sabotageFlag, userJoinFlag, userLeaveFlag, resolveFlag].filter(e => e);

    if (flags.length > 1)
      throw new Error(`RepairSystemReactor amount (${amount}) is invalid. Multiple flags were sent.`);

    if (flags.length === 0)
      throw new Error(`RepairSystemReactor amount (${amount}) is invalid. No flags were sent.`);

    if (sabotageFlag)
      return new RepairSystemReactorSabotage_V2018_11_14_0(senderNetId, playerControlNetId, console);

    if (userJoinFlag)
      return new RepairSystemReactorUserJoin_V2018_11_14_0(senderNetId, playerControlNetId, console);

    if (userLeaveFlag)
      return new RepairSystemReactorUserLeave_V2018_11_14_0(senderNetId, playerControlNetId, console);

    if (resolveFlag)
      return new RepairSystemReactorResolved_V2018_11_14_0(senderNetId, playerControlNetId, console);
  }

  constructor(senderNetId: number, repairerPlayerControlNetId: number, protected readonly console: number) { super(senderNetId, repairerPlayerControlNetId) }

  isRepairSystemReactor(): this is RepairSystemReactor { return true; }
  isRepairSystemReactorResolved(): this is RepairSystemReactorResolved { return false; }
  isRepairSystemReactorSabotage(): this is RepairSystemReactorSabotage { return false; }
  isRepairSystemReactorUserJoin(): this is RepairSystemReactorUserJoin { return false; }
  isRepairSystemReactorUserLeave(): this is RepairSystemReactorUserLeave { return false; }

  getConsoleId() { return this.console }
}

export class RepairSystemReactorResolved_V2018_11_14_0 extends RepairSystemReactor_V2018_11_14_0 implements RepairSystemReactorResolved {
  constructor(
    senderNetId: number,
    repairerPlayerControlNetId: number,
    console: number,
  ) { super(senderNetId, repairerPlayerControlNetId, console) }

  isRepairSystemReactorResolved(): this is RepairSystemReactorResolved {
    return true;
  }

  serializeAmount(): number {
    return 0b0001_0000 + (this.getConsoleId() & 0b0000_0011);
  }
}

export class RepairSystemReactorSabotage_V2018_11_14_0 extends RepairSystemReactor_V2018_11_14_0 implements RepairSystemReactorSabotage {
  constructor(
    senderNetId: number,
    repairerPlayerControlNetId: number,
    console: number,
  ) { super(senderNetId, repairerPlayerControlNetId, console) }

  isRepairSystemReactorSabotage(): this is RepairSystemReactorSabotage {
    return true;
  }

  serializeAmount(): number {
    return 0b1000_0000 + (this.getConsoleId() & 0b0000_0011);
  }
}

export class RepairSystemReactorUserJoin_V2018_11_14_0 extends RepairSystemReactor_V2018_11_14_0 implements RepairSystemReactorUserJoin {
  constructor(
    senderNetId: number,
    repairerPlayerControlNetId: number,
    console: number,
  ) { super(senderNetId, repairerPlayerControlNetId, console) }

  isRepairSystemReactorUserJoin(): this is RepairSystemReactorUserJoin {
    return true;
  }

  serializeAmount(): number {
    return 0b0100_0000 + (this.getConsoleId() & 0b0000_0011);
  }
}

export class RepairSystemReactorUserLeave_V2018_11_14_0 extends RepairSystemReactor_V2018_11_14_0 implements RepairSystemReactorUserLeave {
  constructor(
    senderNetId: number,
    repairerPlayerControlNetId: number,
    console: number,
  ) { super(senderNetId, repairerPlayerControlNetId, console) }

  isRepairSystemReactorUserLeave(): this is RepairSystemReactorUserLeave {
    return true;
  }

  serializeAmount(): number {
    return 0b0010_0000 + (this.getConsoleId() & 0b0000_0011);
  }
}
