import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcReportDeadBody extends GameObjectRpc {
  isRpcReportDeadBody(): this is RpcReportDeadBody {
    return true;
  }

  abstract getDeadBodyPlayerControlNetId(): number;
}

export class RpcReportDeadBodyData extends RpcReportDeadBody {
  constructor(
    protected readonly netId: number,
    protected readonly deadBodyPlayerControlNetId: number
  ) { super() }

  getNetId() { return this.netId }
  getDeadBodyPlayerControlNetId() { return this.deadBodyPlayerControlNetId }
}
