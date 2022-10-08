import { BinaryReader } from "@autil/helpers";

import * as V1 from "./v1";

const versionPacketFactoryMap = {
  [ 1 as number ]: V1.V1PacketFactory,
}

export abstract class HazelPacketFactory {
  static fromVersion(versionNumber: number) {
    return new versionPacketFactoryMap[versionNumber]();
  }
}
