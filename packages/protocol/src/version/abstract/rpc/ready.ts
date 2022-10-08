import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcReady extends GameObjectRpc {
  isRpcReady(): this is RpcReady { return true }
}

export class AbsrtactRpcReady extends RpcReady {
  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }
}
