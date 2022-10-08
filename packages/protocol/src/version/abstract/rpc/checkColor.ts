import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcCheckColor extends GameObjectRpc {
  isRpcCheckColor(): this is RpcCheckColor {
    return true;
  }

  abstract getColor(): number;
}

export class RpcCheckColorData extends RpcCheckColor {
  constructor (
    protected readonly netId: number,
    protected readonly color: number
  ) { super() }

  getNetId() { return this.netId }
  getColor() { return this.color }
}
