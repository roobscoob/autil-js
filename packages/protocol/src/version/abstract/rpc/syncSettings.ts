import { GameObjectRpc } from "../gameObject/rpc";
import { GameOptions } from "../types/gameOptions";

export abstract class RpcSyncSettings extends GameObjectRpc {
  isRpcSyncSettings(): this is RpcSyncSettings {
    return true;
  }

  abstract getGameOptions(): GameOptions; 
}

export class RpcSyncSettingsData extends RpcSyncSettings {
  constructor(
    protected readonly netId: number,
    protected readonly gameOptions: GameOptions,
  ) { super() }

  getNetId() { return this.netId }
  getGameOptions() { return this.gameOptions }
}
