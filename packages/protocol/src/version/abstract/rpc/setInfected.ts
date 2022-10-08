import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcSetInfected extends GameObjectRpc {
  isRpcSetInfected(): this is RpcSetInfected { return false }

  abstract getInfectedPlayerControlNetIds(): number[]
}

export class RpcSetInfectedData extends RpcSetInfected {
  constructor(
    protected readonly netId: number,
    protected readonly infectedPlayerControlNetIds: number[]
  ) { super() }

  getNetId() { return this.netId }
  getInfectedPlayerControlNetIds() { return this.infectedPlayerControlNetIds }
}
