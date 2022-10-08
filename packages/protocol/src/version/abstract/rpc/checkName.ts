import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcCheckName extends GameObjectRpc {
  isRpcCheckName(): this is RpcCheckName {
    return true;
  }

  abstract getName(): string;
}

export class RpcCheckNameData extends RpcCheckName {
  constructor (
    protected readonly netId: number,
    protected readonly name: string
  ) { super() }

  getNetId() { return this.netId }
  getName() { return this.name }
}
