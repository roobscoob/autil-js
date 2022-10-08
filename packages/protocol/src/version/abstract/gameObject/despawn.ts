import { GameObject } from "../rootPackets/gameObject";

export abstract class GameObjectDespawn extends GameObject {
  isDespawn(): this is GameObjectDespawn { return true }

  abstract getNetId(): number;
}

export class GameObjectDespawnData extends GameObjectDespawn {
  constructor(protected readonly netId: number) { super() }

  getNetId(): number { return this.netId }
}
