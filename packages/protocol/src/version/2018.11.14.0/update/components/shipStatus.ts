import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { UpdateShipStatusComponent } from "../../../abstract/update/components/shipStatus";
import { GameObjectUpdate_V2018_11_14_0 } from "../../gameObject/update";
import { UpdateDoorsSystem_V2018_11_14_0 } from "../systems/doors";
import { UpdateHudOverrideSystem_V2018_11_14_0 } from "../systems/hudOverride";
import { UpdateMedScanSystem_V2018_11_14_0 } from "../systems/medScan";
import { UpdateReactorSystem_V2018_11_14_0 } from "../systems/reactor";
import { UpdateSecurityCameraSystem_V2018_11_14_0 } from "../systems/securityCamera";
import { UpdateSwitchSystem_V2018_11_14_0 } from "../systems/switch";

export class UpdateShipStatusComponent_V2018_11_14_0 extends GameObjectUpdate_V2018_11_14_0 implements UpdateShipStatusComponent {
  static fromAbstract(data: UpdateShipStatusComponent) {
    let reactor = data.getReactorSystem();
    let electrical = data.getSwitchSystem();
    let lifesupp = data.getLifeSupportSystem();
    let medscan = data.getMedScanSystem();
    let security = data.getSecurityCameraSystem();
    let comms = data.getHudOverrideSystem();
    let doors = data.getDoorsSystem();

    return new UpdateShipStatusComponent_V2018_11_14_0(
      data.getNetId(),
      reactor ? UpdateReactorSystem_V2018_11_14_0.fromAbstract(reactor) : undefined,
      electrical ? UpdateSwitchSystem_V2018_11_14_0.fromAbstract(electrical) : undefined,
      lifesupp ? UpdateReactorSystem_V2018_11_14_0.fromAbstract(lifesupp) : undefined,
      medscan ? UpdateMedScanSystem_V2018_11_14_0.fromAbstract(medscan) : undefined,
      security ? UpdateSecurityCameraSystem_V2018_11_14_0.fromAbstract(security) : undefined,
      comms ? UpdateHudOverrideSystem_V2018_11_14_0.fromAbstract(comms) : undefined,
      doors ? UpdateDoorsSystem_V2018_11_14_0.fromAbstract(doors) : undefined,
    )
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const dirtyBits = reader.readPackedUInt32();

    const reactor = (dirtyBits & (1 << 3)) ? reader.read(UpdateReactorSystem_V2018_11_14_0) : undefined;
    const electrical = (dirtyBits & (1 << 7)) ? reader.read(UpdateSwitchSystem_V2018_11_14_0) : undefined;
    const lifesupp = (dirtyBits & (1 << 8)) ? reader.read(UpdateReactorSystem_V2018_11_14_0) : undefined;
    const medscan = (dirtyBits & (1 << 10)) ? reader.read(UpdateMedScanSystem_V2018_11_14_0) : undefined;
    const security = (dirtyBits & (1 << 11)) ? reader.read(UpdateSecurityCameraSystem_V2018_11_14_0) : undefined;
    const comms = (dirtyBits & (1 << 14)) ? reader.read(UpdateHudOverrideSystem_V2018_11_14_0) : undefined;
    const doors = (dirtyBits & (1 << 16)) ? reader.read(UpdateDoorsSystem_V2018_11_14_0) : undefined;

    return new UpdateShipStatusComponent_V2018_11_14_0(
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

  constructor(
    netId: number,
    protected readonly reactor: UpdateReactorSystem_V2018_11_14_0 | undefined,
    protected readonly electrical: UpdateSwitchSystem_V2018_11_14_0 | undefined,
    protected readonly lifesupp: UpdateReactorSystem_V2018_11_14_0 | undefined,
    protected readonly medscan: UpdateMedScanSystem_V2018_11_14_0 | undefined,
    protected readonly security: UpdateSecurityCameraSystem_V2018_11_14_0 | undefined,
    protected readonly comms: UpdateHudOverrideSystem_V2018_11_14_0 | undefined,
    protected readonly doors: UpdateDoorsSystem_V2018_11_14_0 | undefined,
  ) { super(netId) }

  isUpdateShipStatus(): this is UpdateShipStatusComponent {
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
    const reactor = this.reactor?.serialize().getBuffer();
    const electrical = this.electrical?.serialize().getBuffer();
    const lifesupp = this.lifesupp?.serialize().getBuffer();
    const medscan = this.medscan?.serialize().getBuffer();
    const security = this.security?.serialize().getBuffer();
    const comms = this.comms?.serialize().getBuffer();
    const doors = this.doors?.serialize().getBuffer();

    const message = MessageWriter.allocate(
      6 +
      (reactor?.byteLength ?? 0) +
      (electrical?.byteLength ?? 0) +
      (lifesupp?.byteLength ?? 0) + 
      (medscan?.byteLength ?? 0) +
      (security?.byteLength ?? 0) + 
      (comms?.byteLength ?? 0) +
      (doors?.byteLength ?? 0)
    );

    let dirtyBits = 0;

    if (reactor) dirtyBits |= (1 << 3);
    if (electrical) dirtyBits |= (1 << 7);
    if (lifesupp) dirtyBits |= (1 << 8);
    if (medscan) dirtyBits |= (1 << 10);
    if (security) dirtyBits |= (1 << 11);
    if (comms) dirtyBits |= (1 << 14);
    if (doors) dirtyBits |= (1 << 16);

    message.writePackedUInt32(dirtyBits);

    if (reactor) message.writeBytes(reactor);
    if (electrical) message.writeBytes(electrical);
    if (lifesupp) message.writeBytes(lifesupp);
    if (medscan) message.writeBytes(medscan);
    if (security) message.writeBytes(security);
    if (comms) message.writeBytes(comms);
    if (doors) message.writeBytes(doors);

    return message;
  }
}
