import { GameObjectUpdate } from "../../gameObject/update";
import { UpdateDoorsSystem } from "../systems/doors";
import { UpdateHudOverrideSystem } from "../systems/hudOverride";
import { UpdateMedScanSystem } from "../systems/medScan";
import { UpdateReactorSystem } from "../systems/reactor";
import { UpdateSecurityCameraSystem } from "../systems/securityCamera";
import { UpdateSwitchSystem } from "../systems/switch";

export abstract class UpdateShipStatusComponent extends GameObjectUpdate {
  abstract getDoorsSystem(): UpdateDoorsSystem | undefined;
  abstract getHudOverrideSystem(): UpdateHudOverrideSystem | undefined;
  abstract getMedScanSystem(): UpdateMedScanSystem | undefined;
  abstract getReactorSystem(): UpdateReactorSystem | undefined;
  abstract getLifeSupportSystem(): UpdateReactorSystem | undefined;
  abstract getSecurityCameraSystem(): UpdateSecurityCameraSystem | undefined;
  abstract getSwitchSystem(): UpdateSwitchSystem | undefined;

  isUpdateShipStatus(): this is UpdateShipStatusComponent { return true }
}

export class UpdateShipStatusComponentData extends UpdateShipStatusComponent {
  constructor(
    protected readonly netId: number,
    protected readonly doorsSystem: UpdateDoorsSystem | undefined,
    protected readonly hudOverrideSystem: UpdateHudOverrideSystem | undefined,
    protected readonly medScanSystem: UpdateMedScanSystem | undefined,
    protected readonly reactorSystem: UpdateReactorSystem | undefined,
    protected readonly lifeSupportSystem: UpdateReactorSystem | undefined,
    protected readonly securityCameraSystem: UpdateSecurityCameraSystem | undefined,
    protected readonly switchSystem: UpdateSwitchSystem | undefined,
  ) { super() }

  getNetId() { return this.netId }
  getDoorsSystem() { return this.doorsSystem }
  getHudOverrideSystem() { return this.hudOverrideSystem }
  getMedScanSystem() { return this.medScanSystem }
  getReactorSystem() { return this.reactorSystem }
  getLifeSupportSystem() { return this.lifeSupportSystem }
  getSecurityCameraSystem() { return this.securityCameraSystem }
  getSwitchSystem() { return this.switchSystem }
}
