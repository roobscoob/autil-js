import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcSetTimesImpostor extends GameObjectRpc {
  isRpcSetTimesImpostor(): this is RpcSetTimesImpostor { return false }

  abstract getPercentImpostor(): number;
}

export class RpcSetTimesImpostorData extends RpcSetTimesImpostor {
  constructor(
    protected readonly netId: number,
    protected readonly percImpostor: number,
  ) { super() }

  getNetId() { return this.netId }
  getPercentImpostor() { return this.percImpostor }
}
