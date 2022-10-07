import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcPlayAnimation extends GameObjectRpc {
  isRpcPlayAnimation(): this is RpcPlayAnimation {
    return true;
  }

  abstract getAnimationId(): number;
}

export class RpcPlayAnimationData extends RpcPlayAnimation {
  constructor(
    protected readonly netId: number,
    protected readonly animationId: number,
  ) { super() }

  getNetId() { return this.netId }
  getAnimationId() { return this.animationId }
}
