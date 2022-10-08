import { GameObject } from "../rootPackets/gameObject";

export abstract class GameObjectSceneChange extends GameObject {
  isSceneChange(): this is GameObjectSceneChange { return true }

  abstract getClientId(): number;
  abstract getTargetScene(): string;
}

export class GameObjectSceneChangeData extends GameObjectSceneChange {
  constructor(
    protected readonly clientId: number,
    protected readonly targetScene: string,
  ) { super() }

  getClientId() { return this.clientId }
  getTargetScene() { return this.targetScene }
}
