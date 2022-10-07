import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RepairSystemHudOverride } from "../../abstract/repairSystem/hudOverride";
import { RepairSystemMedbay } from "../../abstract/repairSystem/medbay";
import { RepairSystemReactor } from "../../abstract/repairSystem/reactor";
import { RepairSystemSecurityCamera } from "../../abstract/repairSystem/securityCamera";
import { RepairSystemSwitch } from "../../abstract/repairSystem/switch";
import { RpcRepairSystem } from "../../abstract/rpc/repairSystem";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { RepairSystemHudOverride_V2018_11_14_0 } from "../repairSystem/hudOverride";
import { RepairSystemMedbay_V2018_11_14_0 } from "../repairSystem/medbay";
import { RepairSystemReactor_V2018_11_14_0 } from "../repairSystem/reactor";
import { RepairSystemSecurityCamera_V2018_11_14_0 } from "../repairSystem/securityCamera";
import { RepairSystemSwitch_V2018_11_14_0 } from "../repairSystem/switch";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export abstract class RpcRepairSystem_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcRepairSystem {
  static fromAbstract(data: RpcRepairSystem): RpcRepairSystem_V2018_11_14_0 {
    if (data.isRepairSystemHudOverride())
      return RepairSystemHudOverride_V2018_11_14_0.fromAbstract(data);

    if (data.isRepairSystemMedbay())
      return RepairSystemMedbay_V2018_11_14_0.fromAbstract(data);

    if (data.isRepairSystemReactor())
      return RepairSystemReactor_V2018_11_14_0.fromAbstract(data);

    if (data.isRepairSystemSecurityCamera())
      return RepairSystemSecurityCamera_V2018_11_14_0.fromAbstract(data);

    if (data.isRepairSystemSwitch())
      return RepairSystemSwitch_V2018_11_14_0.fromAbstract(data);

    throw new Error(`RpcRepairSystem unknown system`);
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    try {
      const v = this.deserializeContents(reader, netId);

      if (reader.hasBytesLeftToRead())
        return undefined;

      return v;
    } catch(err) {
      return undefined;
    }
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const systemType = reader.readUInt8();
    const playerControlNetId = reader.readPackedUInt32();
    const amount = reader.readUInt8();

    switch(systemType) {
      case 0x08:
      case 0x03:
        return RepairSystemReactor_V2018_11_14_0.deserializeAmount(amount, playerControlNetId, netId);
      case 0x07:
        return RepairSystemSwitch_V2018_11_14_0.deserializeAmount(amount, playerControlNetId, netId);
      case 0x0A:
        return RepairSystemMedbay_V2018_11_14_0.deserializeAmount(amount, playerControlNetId, netId);
      case 0x0B:
        return RepairSystemSecurityCamera_V2018_11_14_0.deserializeAmount(amount, playerControlNetId, netId);
      case 0x0E:
        return RepairSystemHudOverride_V2018_11_14_0.deserializeAmount(amount, playerControlNetId, netId);
    }
  }

  isRepairSystemHudOverride(): this is RepairSystemHudOverride {
    return false;
  }

  isRepairSystemMedbay(): this is RepairSystemMedbay {
    return false;
  }

  isRepairSystemReactor(): this is RepairSystemReactor {
    return false;
  }

  isRepairSystemSecurityCamera(): this is RepairSystemSecurityCamera {
    return false;
  }

  isRepairSystemSwitch(): this is RepairSystemSwitch {
    return false;
  }

  constructor(netId: number, protected readonly playerControlNetId: number) { super(netId) }

  getCallId() { return 1 }

  getRepairerPlayerControlNetId(): number {
    return this.playerControlNetId;
  }

  isRpcRepairSystem(): this is RpcRepairSystem {
    return true;
  }

  serializeContents(): BinaryWriter {
    return BinaryWriter.allocate(0);
  }

  abstract serializeAmount(): number;
}
