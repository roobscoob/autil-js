import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcClose extends GameObjectRpc {
  isRpcClose(): this is RpcClose { return true }
}

export class AbsrtactRpcClose extends RpcClose {
  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }
}
