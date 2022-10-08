import { ClientVersion } from "./clientVersion";

export abstract class GameOptions {
  abstract getClientVersion(): ClientVersion;

  abstract getPlayerSpeedModifier(): number;
  abstract getCrewLightModifier(): number;
  abstract getImpostorLightModifier(): number;
  abstract getKillCooldown(): number;
  abstract getNumCommonTasks(): number;
  abstract getNumLongTasks(): number;
  abstract getNumShortTasks(): number;
  abstract getNumEmergencyMeetings(): number;
  abstract getNumImpostors(): number;
  abstract getKillDistance(): number;
  abstract getDiscussionTime(): number;
  abstract getVotingTime(): number;
  abstract claimsDefaults(): boolean;
}

export class GameOptionsData extends GameOptions {
  constructor(
    protected readonly clientVersion: ClientVersion,
    protected readonly playerSpeedModifier: number,
    protected readonly crewLightModifier: number,
    protected readonly impostorLightModifier: number,
    protected readonly killCooldown: number,
    protected readonly numCommonTasks: number,
    protected readonly numLongTasks: number,
    protected readonly numShortTasks: number,
    protected readonly numEmergencyMeetings: number,
    protected readonly numImpostors: number,
    protected readonly killDistance: number,
    protected readonly discussionTime: number,
    protected readonly votingTime: number,
    protected readonly claimDefaults: boolean,
  ) { super() }

  getClientVersion() { return this.clientVersion }
  getPlayerSpeedModifier() { return this.playerSpeedModifier };
  getCrewLightModifier() { return this.crewLightModifier };
  getImpostorLightModifier() { return this.impostorLightModifier };
  getKillCooldown() { return this.killCooldown };
  getNumCommonTasks() { return this.numCommonTasks };
  getNumLongTasks() { return this.numLongTasks };
  getNumShortTasks() { return this.numShortTasks };
  getNumEmergencyMeetings() { return this.numEmergencyMeetings };
  getNumImpostors() { return this.numImpostors };
  getKillDistance() { return this.killDistance };
  getDiscussionTime() { return this.discussionTime };
  getVotingTime() { return this.votingTime };
  claimsDefaults() { return this.claimDefaults };
}
