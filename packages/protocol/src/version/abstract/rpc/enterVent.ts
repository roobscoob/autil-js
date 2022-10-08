import { GameObjectRpc } from "../gameObject/rpc";
import { Vector2 } from "../types/vector2";

export abstract class RpcEnterVent extends GameObjectRpc {
  isRpcEnterVent(): this is RpcEnterVent { return true }

  abstract getVentId(): number;
  abstract getVentPosition(): Vector2;
}

export class RpcEnterVentData extends RpcEnterVent {
  constructor(
    protected readonly netId: number,
    protected readonly ventId: number,
    protected readonly ventPosition: Vector2
  ) { super() }

  getNetId() { return this.netId }
  getVentId() { return this.ventId }
  getVentPosition() { return this.ventPosition }
}
