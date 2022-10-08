import { MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { RpcVotingComplete } from "../../abstract/rpc/votingComplete";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";
import { PlayerVoteArea_V2018_11_14_0 } from "../types/playerVoteArea";
import { Vector2_V2018_11_14_0 } from "../types/vector2";

export class RpcVotingComplete_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcVotingComplete {
  static fromAbstract(data: RpcVotingComplete): RpcVotingComplete_V2018_11_14_0 {
    return new RpcVotingComplete_V2018_11_14_0(
      data.getNetId(),
      data.getStates().map(s => PlayerVoteArea_V2018_11_14_0.fromAbstract(s)),
      data.getExiledPlayerControlNetId(),
      data.isTie(),
    );
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() != 1)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    const states = reader.readArray(reader.readPackedUInt32(), r => r.read(PlayerVoteArea_V2018_11_14_0));
    const exiled = reader.readPackedUInt32();
    const isTie = reader.readBoolean();

    return new RpcVotingComplete_V2018_11_14_0(
      netId,
      states,
      exiled === 0 ? undefined : exiled,
      isTie,
    );
  }

  constructor(
    netId: number,
    protected readonly states: PlayerVoteArea_V2018_11_14_0[],
    protected readonly exiled: number | undefined,
    protected readonly tie: boolean,
  ) { super(netId) }

  getCallId() { return 1 }

  isRpcVotingComplete(): this is RpcVotingComplete {
    return true;
  }

  getExiledPlayerControlNetId() { return this.exiled }
  getStates() { return this.states }
  isTie() { return this.tie }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(13 + this.getStates().length);

    writer.writePackedUInt32(this.getStates().length);

    for (const state of this.getStates()) {
      writer.write(state);
    }

    writer.writePackedUInt32(this.getExiledPlayerControlNetId() ?? 0);
    writer.writeBoolean(this.isTie());

    return writer;
  }
}
