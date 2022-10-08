import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcClearVote extends GameObjectRpc {
  isRpcClearVote(): this is RpcClearVote { return true }
}

export class AbsrtactRpcClearVote extends RpcClearVote {
  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }
}
