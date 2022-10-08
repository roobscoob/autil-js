export abstract class PlayerTask {
  abstract getTaskId(): number;
  abstract isComplete(): boolean;
}

export class PlayerTaskData extends PlayerTask {
  constructor(
    protected readonly taskId: number,
    protected readonly complete: boolean,
  ) { super() }

  getTaskId() { return this.taskId }
  isComplete() { return this.complete }
}
