import { BinaryObjectInstance, BinaryWriter } from "@autil/helpers";
import { BaseRootPacket } from "../base";

export class AmbigousPacket<T extends Exclude<BaseRootPacket, AmbigousPacket>[] = Exclude<BaseRootPacket, AmbigousPacket<any[]>>[]> extends BaseRootPacket {
  protected readonly possibilities: T;

  constructor(...possibilities: T) {
    super();
    this.possibilities = possibilities;
  }

  isAmbigous(): this is AmbigousPacket {
    return true;
  }

  getPossibilities(): T {
    return this.possibilities;
  }

  serialize(): BinaryWriter {
    throw new Error("Cannot serialize an ambigous packet.");
  }
}
