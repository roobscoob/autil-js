import { GameObjectUpdate } from "../../gameObject/update";

export abstract class UpdatePlayerPhysicsComponent extends GameObjectUpdate {
  isUpdatePlayerPhysics(): this is UpdatePlayerPhysicsComponent {
    return true;
  }
}

export class UpdatePlayerPhysicsComponentData extends UpdatePlayerPhysicsComponent {
  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }
}
