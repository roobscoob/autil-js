import { GameObjectUpdate } from "../../gameObject/update";
import { Vector2 } from "../../types/vector2";

export abstract class UpdateCustomNetworkTransformComponent extends GameObjectUpdate {
  abstract getLastSequenceId(): number;
  abstract getPosition(): Vector2;
  abstract getVelocity(): Vector2;

  isUpdateCustomNetworkTransform(): this is UpdateCustomNetworkTransformComponent {
    return true;
  }
}

export class UpdateCustomNetworkTransformComponentData extends UpdateCustomNetworkTransformComponent {
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
