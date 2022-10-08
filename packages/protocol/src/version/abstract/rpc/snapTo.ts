import { GameObjectRpc } from "../gameObject/rpc";
import { Vector2 } from "../types/vector2";

export abstract class RpcSnapTo extends GameObjectRpc {
  isRpcSnapTo(): this is RpcSnapTo { return true }

  abstract getPosition(): Vector2;
  abstract getSequenceId(): number;
}

export class SnapToRpcData extends RpcSnapTo {
  constructor(
    protected readonly netId: number,
    protected readonly position: Vector2,
    protected readonly sequenceId: number,
  ) { super() }

  getNetId() { return this.netId }
  getPosition() { return this.position }
  getSequenceId() { return this.sequenceId }
} 
