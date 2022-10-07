import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcCastVote extends GameObjectRpc {
  isRpcCastVote(): this is RpcCastVote {
    return true;
  }

  abstract getVotingPlayerId(): number;
  abstract getSuspectPlayerId(): number | undefined; 
}

export class RpcCastVoteData extends RpcCastVote {
  constructor(
    protected readonly netId: number,
    protected readonly votingPlayerId: number,
    protected readonly suspectPlayerId: number,
  ) { super() }

  getNetId() { return this.netId }
  getVotingPlayerId() { return this.votingPlayerId }
  getSuspectPlayerId() { return this.suspectPlayerId }
}
