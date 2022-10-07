import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcSetTasks extends GameObjectRpc {
  isRpcSetTasks(): this is RpcSetTasks { return false }

  abstract getPlayerId(): number;
  abstract getTaskIds(): number[];
}

export class RpcSetTasksData extends RpcSetTasks {
  constructor(
    protected readonly netId: number,
    protected readonly playerId: number,
    protected readonly taskIds: number[]
  ) { super() }

  getNetId() { return this.netId }
  getPlayerId() { return this.playerId }
  getTaskIds() { return this.taskIds }
}
