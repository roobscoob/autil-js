import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { GameObjectRpc } from "../../abstract/gameObject/rpc";
import { RpcCastVote } from "../../abstract/rpc/castVote";
import { GameObjectRpc_V2018_11_14_0 } from "../gameObject/rpc";

export class RpcCastVote_V2018_11_14_0 extends GameObjectRpc_V2018_11_14_0 implements RpcCastVote {
  static fromAbstract(data: RpcCastVote): RpcCastVote_V2018_11_14_0 {
    return new RpcCastVote_V2018_11_14_0(data.getNetId(), data.getVotingPlayerId(), data.getSuspectPlayerId() ?? -1);
  }

  static tryDeserializeContents(reader: BinaryReader, netId: number) {
    if (reader.countRemainingBytes() !== 2)
      return undefined;

    return this.deserializeContents(reader, netId);
  }

  static deserializeContents(reader: BinaryReader, netId: number) {
    return new RpcCastVote_V2018_11_14_0(netId, reader.readUInt8(), reader.readSInt8());
  }

  constructor(
    netId: number,
    protected readonly playerId: number,
    protected readonly suspectPlayerId: number,
  ) { super(netId) }

  getCallId() { return 2 }

  getVotingPlayerId() { return this.playerId }
  getSuspectPlayerId() { return this.suspectPlayerId === -1 ? undefined : this.suspectPlayerId }

  isRpcCastVote(): this is RpcCastVote {
    return true;
  }

  serializeContents(): BinaryWriter {
    const writer = BinaryWriter.allocate(6);

    writer.writeUInt8(this.getVotingPlayerId());
    writer.writeSInt8(this.getSuspectPlayerId() ?? -1);

    return writer;
  }
}
