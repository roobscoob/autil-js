import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcCloseDoorsOfType extends GameObjectRpc {
  isRpcCloseDoorsOfType(): this is RpcCloseDoorsOfType {
    return true;
  }

  abstract getSystemType(): number;
}

export class RpcCloseDoorsOfTypeData extends RpcCloseDoorsOfType {
  constructor(
    protected readonly netId: number,
    protected readonly systemType: number
  ) { super() }

  getNetId() { return this.netId }
  getSystemType() { return this.systemType }
}
