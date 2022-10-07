import { GameObjectRpc } from "../gameObject/rpc";
import { Vector2 } from "../types/vector2";

export abstract class RpcExitVent extends GameObjectRpc {
  isRpcExitVent(): this is RpcExitVent { return true }

  abstract getVentId(): number;
}

export class RpcExitVentData extends RpcExitVent {
  constructor(
    protected readonly netId: number,
    protected readonly ventId: number
  ) { super() }

  getNetId() { return this.netId }
  getVentId() { return this.ventId }
}
