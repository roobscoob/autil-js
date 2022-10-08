import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcMurderPlayer extends GameObjectRpc {
  isRpcMurderPlayer(): this is RpcMurderPlayer {
    return true;
  }

  abstract getTargetPlayerControlNetId(): number;
}

export class RpcMurderPlayerData extends RpcMurderPlayer {
  constructor(
    protected readonly netId: number,
    protected readonly targetPlayerControlNetId: number
  ) { super() }

  getNetId() { return this.netId }
  getTargetPlayerControlNetId() { return this.targetPlayerControlNetId }
}
