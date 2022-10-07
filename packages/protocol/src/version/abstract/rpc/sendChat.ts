import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcSendChat extends GameObjectRpc {
  isRpcSendChat(): this is RpcSendChat {
    return true;
  }

  abstract getChatText(): string;
}

export class RpcSendChatData extends RpcSendChat {
  constructor(
    protected readonly netId: number,
    protected readonly chatText: string
  ) { super() }

  getNetId() { return this.netId }
  getChatText() { return this.chatText }
}
