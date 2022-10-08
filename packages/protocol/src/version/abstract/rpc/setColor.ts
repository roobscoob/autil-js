import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcSetColor extends GameObjectRpc {
  isRpcSetColor(): this is RpcSetColor {
    return true;
  }

  abstract getColor(): number;
}

export class RpcSetColorData extends RpcSetColor {
  constructor (
    protected readonly netId: number,
    protected readonly color: number
  ) { super() }

  getNetId() { return this.netId }
  getColor() { return this.color }
}
