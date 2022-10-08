import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { GameOptions } from "../../abstract/types/gameOptions";
import { ClientVersion_V2018_11_14_0 } from "./clientVersion";
import { GameCode_V2018_11_14_0 } from "./gameCode";

export class GameOptions_V2018_11_14_0 extends GameOptions {
  static fromAbstract(data: GameOptions) {
    return new GameOptions_V2018_11_14_0(
      ClientVersion_V2018_11_14_0.fromAbstract(data.getClientVersion()),
      data.getPlayerSpeedModifier(),
      data.getCrewLightModifier(),
      data.getImpostorLightModifier(),
      data.getKillCooldown(),
      data.getNumCommonTasks(),
      data.getNumLongTasks(),
      data.getNumShortTasks(),
      data.getNumEmergencyMeetings(),
      data.getNumImpostors(),
      data.getKillDistance(),
      data.getDiscussionTime(),
      data.getVotingTime(),
      data.claimsDefaults(),
    )
  }

  static deserialize(reader: BinaryReader) {
    return new GameOptions_V2018_11_14_0(
      reader.read(ClientVersion_V2018_11_14_0),
      reader.readFloat32LE(),
      reader.readFloat32LE(),
      reader.readFloat32LE(),
      reader.readFloat32LE(),
      reader.readUInt32LE(),
      reader.readUInt32LE(),
      reader.readUInt32LE(),
      reader.readUInt32LE(),
      reader.readUInt32LE(),
      reader.readUInt32LE(),
      reader.readUInt32LE(),
      reader.readUInt32LE(),
      reader.readBoolean(),
    );
  }

  constructor(
    protected readonly clientVersion: ClientVersion_V2018_11_14_0,
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

  serialize(): BinaryWriter {
    const alloc = BinaryWriter.allocate(53);

    alloc.write(this.getClientVersion());
    alloc.writeFloat32LE(this.getPlayerSpeedModifier());
    alloc.writeFloat32LE(this.getCrewLightModifier());
    alloc.writeFloat32LE(this.getImpostorLightModifier());
    alloc.writeFloat32LE(this.getKillCooldown());
    alloc.writeUInt32LE(this.getNumCommonTasks());
    alloc.writeUInt32LE(this.getNumLongTasks());
    alloc.writeUInt32LE(this.getNumShortTasks());
    alloc.writeUInt32LE(this.getNumEmergencyMeetings());
    alloc.writeUInt32LE(this.getNumImpostors());
    alloc.writeUInt32LE(this.getKillDistance());
    alloc.writeUInt32LE(this.getDiscussionTime());
    alloc.writeUInt32LE(this.getVotingTime());
    alloc.writeBoolean(this.claimsDefaults());

    return alloc;
  }
}
