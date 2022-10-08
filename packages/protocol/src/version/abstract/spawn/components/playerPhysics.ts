import { SpawnComponent } from ".";

export abstract class SpawnPlayerPhysicsComponent extends SpawnComponent {
  isPlayerPhysics(): this is SpawnPlayerPhysicsComponent {
    return true;
  }
}

export class SpawnPlayerPhysicsComponentData extends SpawnPlayerPhysicsComponent {
  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }
}
