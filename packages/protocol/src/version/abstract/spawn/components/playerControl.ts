import { SpawnComponent } from "."

export abstract class SpawnPlayerControlComponent extends SpawnComponent {
  isPlayerControl(): this is SpawnPlayerControlComponent {
    return true;
  }

  abstract getName(): string;
  abstract getColor(): number;
  abstract getHat(): number;
  abstract isNew(): boolean;
  abstract isImpostor(): boolean;
  abstract isDead(): boolean;
  abstract isGameOver(): boolean;
  abstract getPlayerId(): number;
}

export class SpawnPlayerControlComponentData extends SpawnPlayerControlComponent {
  constructor(
    protected readonly netId: number,
    protected readonly name: string,
    protected readonly color: number,
    protected readonly hat: number,
    protected readonly _isNew: boolean,
    protected readonly impostor: boolean,
    protected readonly dead: boolean,
    protected readonly gameOver: boolean,
    protected readonly playerId: number,
  ) { super() }

  getNetId() { return this.netId }
  getName() { return this.name }
  getColor() { return this.color }
  getHat() { return this.hat }
  isNew() { return this._isNew }
  isImpostor() { return this.impostor }
  isDead() { return this.dead }
  isGameOver() { return this.gameOver }
  getPlayerId() { return this.playerId }
}
