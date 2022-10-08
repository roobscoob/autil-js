import { SpawnComponent } from ".";
import { SpawnDoorsSystem } from "../systems/doors";
import { SpawnHudOverrideSystem } from "../systems/hudOverride";
import { SpawnMedScanSystem } from "../systems/medScan";
import { SpawnReactorSystem } from "../systems/reactor";
import { SpawnSecurityCameraSystem } from "../systems/securityCamera";
import { SpawnSwitchSystem } from "../systems/switch";

export abstract class SpawnShipStatusComponent extends SpawnComponent {
  isShipStatus(): this is SpawnShipStatusComponent {
    return true;
  }

  abstract getDoorsSystem(): SpawnDoorsSystem;
  abstract getHudOverrideSystem(): SpawnHudOverrideSystem;
  abstract getMedScanSystem(): SpawnMedScanSystem;
  abstract getReactorSystem(): SpawnReactorSystem;
  abstract getLifeSupportSystem(): SpawnReactorSystem;
  abstract getSecurityCameraSystem(): SpawnSecurityCameraSystem;
  abstract getSwitchSystem(): SpawnSwitchSystem;
}

export class SpawnShipStatusComponentData extends SpawnShipStatusComponent {
  constructor(
    protected readonly netId: number,
    protected readonly doorsSystem: SpawnDoorsSystem,
    protected readonly hudOverrideSystem: SpawnHudOverrideSystem,
    protected readonly medScanSystem: SpawnMedScanSystem,
    protected readonly reactorSystem: SpawnReactorSystem,
    protected readonly lifeSupportSystem: SpawnReactorSystem,
    protected readonly securityCameraSystem: SpawnSecurityCameraSystem,
    protected readonly switchSystem: SpawnSwitchSystem,
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
