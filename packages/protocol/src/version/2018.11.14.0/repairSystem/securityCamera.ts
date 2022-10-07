import { RepairSystemSecurityCamera, RepairSystemSecurityCameraStopUsing, RepairSystemSecurityCameraStartUsing } from "../../abstract/repairSystem/securityCamera";
import { RpcRepairSystem_V2018_11_14_0 } from "../rpc/repairSystem";

export abstract class RepairSystemSecurityCamera_V2018_11_14_0 extends RpcRepairSystem_V2018_11_14_0 implements RepairSystemSecurityCamera {
  static fromAbstract(data: RepairSystemSecurityCamera): RepairSystemSecurityCamera_V2018_11_14_0 {
    if ((data as any).isRepairSystemSecurityCameraStartUsing())
      return RepairSystemSecurityCameraStartUsing_V2018_11_14_0.fromAbstract(data);

    if ((data as any).isRepairSystemSecurityCameraStopUsing())
      return RepairSystemSecurityCameraStopUsing_V2018_11_14_0.fromAbstract(data);

    throw new Error(`Unknown RepairSystemSecurityCamera state`);
  }

  static deserializeAmount(amount: number, playerControlNetId: number, senderNetId: number) {
    const joinFlag = amount & 0b0000_0001;
    const unusedData = amount & 0b1111_1110;

    if (unusedData)
      throw new Error(`RepairSystemSecurityCamera amount (${amount}) is invalid. There is data in unused bits 0b1111_1110.`);

    if (joinFlag)
      return new RepairSystemSecurityCameraStopUsing_V2018_11_14_0(senderNetId, playerControlNetId);

    throw new Error(`RepairSystemSecurityCamera amount (${amount}) is invalid. Missing both a StartUsing flag and a StopUsing flag.`);
  }

  constructor(senderNetId: number, repairerPlayerControlNetId: number) { super(senderNetId, repairerPlayerControlNetId) }

  isRepairSystemSecurityCamera(): this is RepairSystemSecurityCamera {
    return true;
  }

  isRepairSystemSecurityCameraStartUsing(): this is RepairSystemSecurityCameraStartUsing {
    return false;
  }

  isRepairSystemSecurityCameraStopUsing(): this is RepairSystemSecurityCameraStopUsing {
    return false;
  }
}

export class RepairSystemSecurityCameraStartUsing_V2018_11_14_0 extends RepairSystemSecurityCamera_V2018_11_14_0 implements RepairSystemSecurityCameraStartUsing {
  static fromAbstract(data: RepairSystemSecurityCameraStartUsing): RepairSystemSecurityCameraStartUsing_V2018_11_14_0 {
    return new RepairSystemSecurityCameraStartUsing_V2018_11_14_0(
      data.getNetId(),
      data.getRepairerPlayerControlNetId(),
    )
  }

  isRepairSystemSecurityCameraStartUsing(): this is RepairSystemSecurityCameraStartUsing {
    return true;
  }

  serializeAmount(): number {
    return 0b0000_0001;
  }
}

export class RepairSystemSecurityCameraStopUsing_V2018_11_14_0 extends RepairSystemSecurityCamera_V2018_11_14_0 implements RepairSystemSecurityCameraStopUsing {
  static fromAbstract(data: RepairSystemSecurityCameraStopUsing): RepairSystemSecurityCameraStopUsing_V2018_11_14_0 {
    return new RepairSystemSecurityCameraStopUsing_V2018_11_14_0(
      data.getNetId(),
      data.getRepairerPlayerControlNetId(),
    )
  }

  isRepairSystemSecurityCameraStopUsing(): this is RepairSystemSecurityCameraStopUsing {
    return true;
  }

  serializeAmount(): number {
    return 0b0000_0000;
  }
}
