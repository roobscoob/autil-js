import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcSetHat extends GameObjectRpc {
  isRpcSetHat(): this is RpcSetHat {
    return true;
  }

  abstract getHat(): number;
}

export class RpcSetHatData extends RpcSetHat {
  constructor (
    protected readonly netId: number,
    protected readonly hat: number
  ) { super() }

  getNetId() { return this.netId }
  getHat() { return this.hat }
}
