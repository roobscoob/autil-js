import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcSyncSettings } from "../../abstract/rpc/syncSettings";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { GameOptions_V2018_11_14_0 } from "../types/gameOptions";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcSyncSettings_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcSyncSettings {
  static fromAbstract(data: RpcSyncSettings): RpcSyncSettings_V2018_11_14_0 {
    return new RpcSyncSettings_V2018_11_14_0(data.getNetId(), GameOptions_V2018_11_14_0.fromAbstract(data.getGameOptions()));
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
    return new RpcSyncSettings_V2018_11_14_0(netId, reader.readBytes(reader.readPackedUInt32()).read(GameOptions_V2018_11_14_0));
  }

  constructor(netId: number, protected readonly options: GameOptions_V2018_11_14_0) { super(netId) }

  getCallId() { return 2 }

  getGameOptions() { return this.options }

  isRpcSyncSettings(): this is RpcSyncSettings {
    return true;
  }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(59);

    writer.writePackedUInt32(53); //sizeof gameOptions
    writer.write(this.options);

    return writer;
  }
}
