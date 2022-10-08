import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryObjectInstance } from "@autil/helpers";
import { SocketContext } from "../../staticFactory/context";
import { AlterGame } from "./rootPackets/alterGame";
import { EndGame } from "./rootPackets/endGame";
import { GetGameListC2S, GetGameListS2C } from "./rootPackets/getGameList";
import { HostGameC2S, HostGameS2C } from "./rootPackets/hostGame";
import { JoinedGameS2C } from "./rootPackets/joinedGame";
import { JoinGameC2S, JoinGameS2CBroadcast, JoinGameS2CRejection } from "./rootPackets/joinGame";
import { KickPlayer } from "./rootPackets/kickPlayer";
import { GameObjectSet } from "./rootPackets/gameObject";
import { RemoveGameC2S, RemoveGameS2C } from "./rootPackets/removeGame";
import { RemovePlayerS2C } from "./rootPackets/removePlayer";
import { StartGameC2S, StartGameS2C } from "./rootPackets/startGame";
import { WaitForHostS2C } from "./rootPackets/waitForHost";
import { BaseRootPacket } from "./rootPackets/base";

export enum PacketSender {
  Client,
  Server,
}

export enum PacketRecipient {
  Server,
  Client,
}

export interface IRootPacketFactory {
  deserialize(reader: MessageReader | MessageWriter, state?: SocketContext, side?: PacketSender | PacketRecipient): BaseRootPacket & BinaryObjectInstance;

  createAlterGamePacket(data: AlterGame): AlterGame & { serialize(): MessageWriter };
  createEndGamePacket(data: EndGame): EndGame & { serialize(): MessageWriter };
  createGetGameListPacket(data: GetGameListC2S): GetGameListC2S & { serialize(): MessageWriter };
  createGetGameListPacket(data: GetGameListS2C): GetGameListS2C & { serialize(): MessageWriter };
  createHostGamePacket(data: HostGameC2S): HostGameC2S & { serialize(): MessageWriter };
  createHostGamePacket(data: HostGameS2C): HostGameS2C & { serialize(): MessageWriter };
  createJoinedGamePacket(data: JoinedGameS2C): JoinedGameS2C & { serialize(): MessageWriter };
  createJoinGamePacket(data: JoinGameS2CRejection): JoinGameS2CRejection & { serialize(): MessageWriter };
  createJoinGamePacket(data: JoinGameS2CBroadcast): JoinGameS2CBroadcast & { serialize(): MessageWriter };
  createJoinGamePacket(data: JoinGameC2S): JoinGameC2S & { serialize(): MessageWriter };
  createKickPlayerPacket(data: KickPlayer): KickPlayer & { serialize(): MessageWriter };
  createGameObjectSetPacket(data: GameObjectSet): GameObjectSet & { serialize(): MessageWriter };
  createRemoveGamePacket(data: RemoveGameS2C): RemoveGameS2C & { serialize(): MessageWriter };
  createRemoveGamePacket(data: RemoveGameC2S): RemoveGameC2S & { serialize(): MessageWriter };
  createRemovePlayerPacket(data: RemovePlayerS2C): RemovePlayerS2C & { serialize(): MessageWriter };
  createStartGamePacket(data: StartGameS2C): StartGameS2C & { serialize(): MessageWriter };
  createStartGamePacket(data: StartGameC2S): StartGameC2S & { serialize(): MessageWriter };
  createWaitForHostPacket(data: WaitForHostS2C): WaitForHostS2C & { serialize(): MessageWriter };
}
