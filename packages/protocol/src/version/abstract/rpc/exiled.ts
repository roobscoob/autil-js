import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcExiled extends GameObjectRpc {
  isRpcExiled(): this is RpcExiled { return true }
}

export class AbsrtactRpcExiled extends RpcExiled {
  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }
}
