import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcExitAllVents extends GameObjectRpc {
  isRpcExitAllVents(): this is RpcExitAllVents { return true }
}

export class AbsrtactRpcExitAllVents extends RpcExitAllVents {
  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }
}
