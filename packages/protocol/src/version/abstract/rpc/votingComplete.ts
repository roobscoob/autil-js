import { GameObjectRpc } from "../gameObject/rpc";
import { PlayerVoteArea } from "../types/playerVoteArea";

export abstract class RpcVotingComplete extends GameObjectRpc {
  isRpcVotingComplete(): this is RpcVotingComplete { return true }

  abstract getStates(): PlayerVoteArea[];
  abstract getExiledPlayerControlNetId(): number | undefined;
  abstract isTie(): boolean;
}

export class RpcVotingCompleteData extends RpcVotingComplete {
  constructor(
    protected readonly netId: number,
    protected readonly states: PlayerVoteArea[],
    protected readonly exiledPlayerControlNetId: number | undefined,
    protected readonly tie: boolean,
  ) { super() }

  getNetId() { return this.netId }
  getStates() { return this.states }
  getExiledPlayerControlNetId() { return this.exiledPlayerControlNetId }
  isTie() { return this.tie }
}
