import { PlayerTask } from "./playerTask"

export abstract class PlayerInfo {
  abstract getPlayerId(): number;
  abstract getName(): string;
  abstract getColor(): number;
  abstract isDisconnected(): boolean;
  abstract getTasks(): PlayerTask[];
}

export class PlayerInfoData extends PlayerInfo {
  constructor(
    protected readonly playerId: number,
    protected readonly name: string,
    protected readonly color: number,
    protected readonly disconnected: boolean,
    protected readonly tasks: PlayerTask[],
  ) { super() }

  getPlayerId() { return this.playerId }
  getName() { return this.name }
  getColor() { return this.color }
  isDisconnected() { return this.disconnected }
  getTasks() { return this.tasks }
}
