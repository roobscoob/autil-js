import { SpawnComponent } from ".";
import { GameCode } from "../../types/gameCode";
import { Vector2 } from "../../types/vector2";

export abstract class SpawnCustomNetworkTransformComponent extends SpawnComponent {
  isCustomNetworkTransform(): this is SpawnCustomNetworkTransformComponent {
    return true;
  }

  abstract getLastSequenceId(): number;
  abstract getPosition(): Vector2;
  abstract getVelocity(): Vector2;
}

export class SpawnCustomNetworkTransformComponentData extends SpawnCustomNetworkTransformComponent {
  constructor(
    protected readonly netId: number,
    protected readonly lastSequenceId: number,
    protected readonly position: Vector2,
    protected readonly velocity: Vector2,
  ) { super() }

  getNetId() { return this.netId }
  getLastSequenceId() { return this.lastSequenceId }
  getPosition() { return this.position }
  getVelocity() { return this.velocity }
}
