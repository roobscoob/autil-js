import { RootPacketFactory_V2018_11_14_0 } from "../version/2018.11.14.0/factory";
import { ClientVersion } from "../version/abstract/types/clientVersion";
import { IRootPacketFactory } from "../version/abstract/factory";

export const registeredVersions = new Map<string, new () => IRootPacketFactory>();

registeredVersions.set("2018.11.14.0", RootPacketFactory_V2018_11_14_0);

export class PacketFactory {
  static fromVersion(inVersion: ClientVersion) {
    const versionStr = inVersion.toString();

    const version = registeredVersions.get(versionStr);

    if (version === undefined)
      throw new Error("No packet factory for version " + versionStr + " is registered.");

    return new version();
  }
}
