import { GameObjectUpdate } from "../../gameObject/update";

export abstract class UpdateLobbyBehaviourComponent extends GameObjectUpdate {
  isUpdateLobbyBehaviour(): this is UpdateLobbyBehaviourComponent {
    return true;
  }
}

export class UpdateLobbyBehaviourComponentData extends UpdateLobbyBehaviourComponent {
  constructor(
    protected readonly netId: number,
  ) { super() }

  getNetId() { return this.netId }
}
