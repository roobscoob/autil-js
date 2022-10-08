import { SpawnComponent } from ".";

export abstract class SpawnLobbyBehaviourComponent extends SpawnComponent {
  isLobbyBehaviour(): this is SpawnLobbyBehaviourComponent {
    return true;
  }
}

export class SpawnLobbyBehaviourComponentData extends SpawnLobbyBehaviourComponent {
  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }
}
