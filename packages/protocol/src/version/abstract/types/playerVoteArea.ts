export abstract class PlayerVoteArea {
  abstract getVotedFor(): number | undefined;
  abstract isDead(): boolean;
  abstract didVote(): boolean;
  abstract didReport(): boolean;
}

export class PlayerVoteAreaData extends PlayerVoteArea {
  constructor(
    protected readonly votedFor: number | undefined,
    protected readonly dead: boolean,
    protected readonly voted: boolean,
    protected readonly reported: boolean,
  ) { super() }

  getVotedFor() { return this.votedFor }
  isDead() { return this.dead }
  didVote() { return this.voted }
  didReport() { return this.reported }
}
