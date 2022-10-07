import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcCompleteTask extends GameObjectRpc {
  isRpcCompleteTask(): this is RpcCompleteTask {
    return true
  }

  abstract getPlayerControlNetId(): number | undefined;
  abstract getTaskId(): number;
}

export class RpcCompleteTaskData extends RpcCompleteTask {
  constructor(
    protected readonly netId: number,
    protected readonly taskId: number,
    protected readonly playerControlNetId?: number,
  ) { super() }

  getNetId() { return this.netId }
  getPlayerControlNetId() { return this.netId }
  getTaskId() { return this.taskId }
}
