import { RepairSystemSwitch, RepairSystemSwitchFlip, RepairSystemSwitchSabotage } from "../../abstract/repairSystem/switch";
import { RpcRepairSystem } from "../../abstract/rpc/repairSystem";
import { Switches } from "../../abstract/types/switches";
import { RpcRepairSystem_V2018_11_14_0 } from "../rpc/repairSystem";
import { Switches_V2018_11_14_0 } from "../types/switch";

export abstract class RepairSystemSwitch_V2018_11_14_0 extends RpcRepairSystem_V2018_11_14_0 implements RepairSystemSwitch {
  static fromAbstract(data: RepairSystemSwitch): RepairSystemSwitch_V2018_11_14_0 {
    if (data.isRepairSystemSwitchSabotage())
      return RepairSystemSwitchSabotage_V2018_11_14_0.fromAbstract(data);

    if (data.isRepairSystemSwitchFlip())
      return RepairSystemSwitchFlip_V2018_11_14_0.fromAbstract(data);

    throw new Error(`Unknown RepairSystemSwitch state`);
  }

  static deserializeAmount(amount: number, playerControlNetId: number, senderNetId: number) {
    const sabotageFlag = amount & 0b1000_0000;

    if (sabotageFlag) {
      const switches =   amount & 0b0001_1111;
      const unusedData = amount & 0b0110_0000;

      if (unusedData !== 0)
        throw new Error(`RepairSystemSwitch amount (${amount}) is invalid. There is unused data in 0b0110_0000 for sabotage.`)

      return new RepairSystemSwitchSabotage_V2018_11_14_0(senderNetId, playerControlNetId, Switches_V2018_11_14_0.fromByte(switches));
    }

    const switchIndex = amount & 0b0000_0111;
    const unusedData  = amount & 0b0111_1000;

    if (unusedData !== 0)
      throw new Error(`RepairSystemSwitch amount (${amount}) is invalid. There is unused data in 0b0111_1000 for flip.`)

    return new RepairSystemSwitchFlip_V2018_11_14_0(senderNetId, playerControlNetId, switchIndex);
  }

  isRepairSystemSwitch(): this is RepairSystemSwitch {
    return true;
  }

  isRepairSystemSwitchFlip(): this is RepairSystemSwitchFlip {
    return false;
  }

  isRepairSystemSwitchSabotage(): this is RepairSystemSwitchSabotage {
    return false;
  }
}

export class RepairSystemSwitchSabotage_V2018_11_14_0 extends RepairSystemSwitch_V2018_11_14_0 implements RepairSystemSwitchSabotage {
  static fromAbstract(data: RepairSystemSwitchSabotage): RepairSystemSwitchSabotage_V2018_11_14_0 {
    return new RepairSystemSwitchSabotage_V2018_11_14_0(data.getNetId(), data.getRepairerPlayerControlNetId(), Switches_V2018_11_14_0.fromAbstract(data.getFlipState()));
  }

  constructor(
    sender: number, pc: number,
    protected readonly switches: Switches_V2018_11_14_0,
  ) { super(sender, pc) }

  getFlipState(): Switches {
    return this.switches;
  }

  isRepairSystemSwitchSabotage(): this is RepairSystemSwitchSabotage {
    return true;
  }

  serializeAmount() { return 0b1000_0000 }
}

export class RepairSystemSwitchFlip_V2018_11_14_0 extends RepairSystemSwitch_V2018_11_14_0 implements RepairSystemSwitchFlip {
  static fromAbstract(data: RepairSystemSwitchFlip): RepairSystemSwitchFlip_V2018_11_14_0 {
    return new RepairSystemSwitchFlip_V2018_11_14_0(data.getNetId(), data.getRepairerPlayerControlNetId(), data.getSwitchIndex())
  }

  constructor(
    sender: number, pc: number,
    protected readonly flipIndex: number,
  ) { super(sender, pc) }

  getSwitchIndex(): number {
    return this.flipIndex;
  }

  isRepairSystemSwitchFlip(): this is RepairSystemSwitchFlip {
    return true;
  }

  serializeAmount() { return 0b0000_0000 }
}
