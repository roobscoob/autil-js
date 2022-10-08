import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcSetName extends GameObjectRpc {
  isRpcSetName(): this is RpcSetName {
    return true;
  }

  abstract getName(): string;
}

export class RpcSetNameData extends RpcSetName {
  constructor (
    protected readonly netId: number,
    protected readonly name: string
  ) { super() }

  getNetId() { return this.netId }
  getName() { return this.name }
}
