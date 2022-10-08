import { GameObjectUpdate } from "../../gameObject/update"

export abstract class UpdatePlayerControlComponent extends GameObjectUpdate {
  abstract isImpostor(): boolean;
  abstract isDead(): boolean;
  abstract isGameOver(): boolean;
  abstract getPlayerId(): number;

  isUpdatePlayerControl(): this is UpdatePlayerControlComponent {
    return true;
  }
}

export class UpdatePlayerControlComponentData extends UpdatePlayerControlComponent {
  constructor(
    protected readonly netId: number,
    protected readonly impostor: boolean,
    protected readonly dead: boolean,
    protected readonly gameOver: boolean,
    protected readonly playerId: number,
  ) { super() }

  getNetId() { return this.netId }
  isImpostor() { return this.impostor }
  isDead() { return this.dead }
  isGameOver() { return this.gameOver }
  getPlayerId() { return this.playerId }
}
