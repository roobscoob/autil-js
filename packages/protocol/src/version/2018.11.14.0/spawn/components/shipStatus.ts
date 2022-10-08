import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { SpawnComponent_V2018_11_14_0 } from ".";
import { SpawnShipStatusComponent } from "../../../abstract/spawn/components/shipStatus";
import { SpawnDoorsSystem_V2018_11_14_0 } from "../systems/doors";
import { SpawnHudOverrideSystem_V2018_11_14_0 } from "../systems/hudOverride";
import { SpawnMedScanSystem_V2018_11_14_0 } from "../systems/medScan";
import { SpawnReactorSystem_V2018_11_14_0 } from "../systems/reactor";
import { SpawnSecurityCameraSystem_V2018_11_14_0 } from "../systems/securityCamera";
import { SpawnSwitchSystem_V2018_11_14_0 } from "../systems/switch";

export class SpawnShipStatusComponent_V2018_11_14_0 extends SpawnComponent_V2018_11_14_0 implements SpawnShipStatusComponent {
  static fromAbstract(data: SpawnShipStatusComponent) {
    return new SpawnShipStatusComponent_V2018_11_14_0(
      data.getNetId(),
      SpawnReactorSystem_V2018_11_14_0.fromAbstract(data.getReactorSystem()),
      SpawnSwitchSystem_V2018_11_14_0.fromAbstract(data.getSwitchSystem()),
      SpawnReactorSystem_V2018_11_14_0.fromAbstract(data.getLifeSupportSystem()),
      SpawnMedScanSystem_V2018_11_14_0.fromAbstract(data.getMedScanSystem()),
      SpawnSecurityCameraSystem_V2018_11_14_0.fromAbstract(data.getSecurityCameraSystem()),
      SpawnHudOverrideSystem_V2018_11_14_0.fromAbstract(data.getHudOverrideSystem()),
      SpawnDoorsSystem_V2018_11_14_0.fromAbstract(data.getDoorsSystem()),
    )
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const reactor = reader.read(SpawnReactorSystem_V2018_11_14_0);
    const electrical = reader.read(SpawnSwitchSystem_V2018_11_14_0);
    const lifesupp = reader.read(SpawnReactorSystem_V2018_11_14_0);
    const medscan = reader.read(SpawnMedScanSystem_V2018_11_14_0);
    const security = reader.read(SpawnSecurityCameraSystem_V2018_11_14_0);
    const comms = reader.read(SpawnHudOverrideSystem_V2018_11_14_0);
    const doors = reader.read(SpawnDoorsSystem_V2018_11_14_0, reader.countRemainingBytes());

    return new SpawnShipStatusComponent_V2018_11_14_0(
      netId,
      reactor,
      electrical,
      lifesupp,
      medscan,
      security,
      comms,
      doors,
    )
  }

  constructor(
    netId: number,
    protected readonly reactor: SpawnReactorSystem_V2018_11_14_0,
    protected readonly electrical: SpawnSwitchSystem_V2018_11_14_0,
    protected readonly lifesupp: SpawnReactorSystem_V2018_11_14_0,
    protected readonly medscan: SpawnMedScanSystem_V2018_11_14_0,
    protected readonly security: SpawnSecurityCameraSystem_V2018_11_14_0,
    protected readonly comms: SpawnHudOverrideSystem_V2018_11_14_0,
    protected readonly doors: SpawnDoorsSystem_V2018_11_14_0,
  ) { super(netId) }

  isShipStatus(): this is SpawnShipStatusComponent {
    return true;
  }

  getReactorSystem() { return this.reactor }
  getSwitchSystem() { return this.electrical }
  getLifeSupportSystem() { return this.lifesupp }
  getMedScanSystem() { return this.medscan }
  getSecurityCameraSystem() { return this.security }
  getHudOverrideSystem() { return this.comms }
  getDoorsSystem() { return this.doors }

  serializeContents(): MessageWriter {
    const reactor = this.reactor.serialize().getBuffer();
    const electrical = this.electrical.serialize().getBuffer();
    const lifesupp = this.lifesupp.serialize().getBuffer();
    const medscan = this.medscan.serialize().getBuffer();
    const security = this.security.serialize().getBuffer();
    const comms = this.comms.serialize().getBuffer();
    const doors = this.doors.serialize().getBuffer();

    const message = MessageWriter.allocate(
      reactor.byteLength +
      electrical.byteLength +
      lifesupp.byteLength + 
      medscan.byteLength +
      security.byteLength + 
      comms.byteLength +
      doors.byteLength
    );

    message.writeBytes(reactor);
    message.writeBytes(electrical);
    message.writeBytes(lifesupp);
    message.writeBytes(medscan);
    message.writeBytes(security);
    message.writeBytes(comms);
    message.writeBytes(doors);

    return message;
  }
}
