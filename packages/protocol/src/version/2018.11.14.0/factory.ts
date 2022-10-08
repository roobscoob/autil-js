// pre-import certain modules

import "./gameObject/despawn";

// used imports

import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader, BinaryObjectInstance } from "@autil/helpers";
import { EmptySocketContext, SocketContext } from "../../staticFactory/context";
import { IRootPacketFactory, PacketRecipient, PacketSender } from "../abstract/factory";
import { AlterGame } from "../abstract/rootPackets/alterGame";
import { EndGame } from "../abstract/rootPackets/endGame";
import { GetGameListC2S, GetGameListS2C } from "../abstract/rootPackets/getGameList";
import { HostGameC2S, HostGameS2C } from "../abstract/rootPackets/hostGame";
import { JoinedGameS2C } from "../abstract/rootPackets/joinedGame";
import { JoinGameC2S, JoinGameS2CBroadcast, JoinGameS2CRejection } from "../abstract/rootPackets/joinGame";
import { KickPlayer } from "../abstract/rootPackets/kickPlayer";
import { GameObject, GameObjectSet } from "../abstract/rootPackets/gameObject";
import { RemoveGameC2S, RemoveGameS2C } from "../abstract/rootPackets/removeGame";
import { RemovePlayerS2C } from "../abstract/rootPackets/removePlayer";
import { StartGameC2S, StartGameS2C } from "../abstract/rootPackets/startGame";
import { WaitForHostS2C } from "../abstract/rootPackets/waitForHost";
import { AlterGame_V2018_11_14_0 } from "./rootPackets/alterGame";
import { EndGame_V2018_11_14_0 } from "./rootPackets/endGame";
import { GameObjectSet_V2018_11_14_0 } from "./rootPackets/gameObject/set";
import { GetGameListC2S_V2018_11_14_0, GetGameListS2C_V2018_11_14_0 } from "./rootPackets/getGameList";
import { HostGameC2SPacket_V2018_11_14_0, HostGameS2CPacket_V2018_11_14_0 } from "./rootPackets/hostGame";
import { JoinedGameS2C_V2018_11_14_0 } from "./rootPackets/joinedGame";
import { JoinGameC2S_V2018_11_14_0, JoinGameS2CBroadcast_V2018_11_14_0, JoinGameS2CRejection_V2018_11_14_0, JoinGameS2C_V2018_11_14_0 } from "./rootPackets/joinGame";
import { KickPlayer_V2018_11_14_0 } from "./rootPackets/kickPlayer";
import { RemoveGameC2S_V2018_11_14_0, RemoveGameS2C_V2018_11_14_0 } from "./rootPackets/removeGame";
import { RemovePlayerS2C_V2018_11_14_0 } from "./rootPackets/removePlayer";
import { StartGameC2S_V2018_11_14_0, StartGameS2C_V2018_11_14_0 } from "./rootPackets/startGame";
import { WaitForHostS2C_V2018_11_14_0 } from "./rootPackets/waitForHost";
import { RootPacketTags_V2018_11_14_0 } from "./tags";
import { AmbigousPacket } from "../abstract/rootPackets/ambigous";

export class RootPacketFactory_V2018_11_14_0 implements IRootPacketFactory {
  deserialize(buffer: MessageReader | MessageWriter, context: SocketContext = new EmptySocketContext, side?: PacketSender | PacketRecipient) {
    const reader = buffer instanceof MessageReader ? buffer : MessageReader.fromTagged(buffer.getTag(), buffer.getBuffer())

    switch(reader.getTag()) {
      case RootPacketTags_V2018_11_14_0.AlterGame:
        return AlterGame_V2018_11_14_0.deserialize(reader);
      case RootPacketTags_V2018_11_14_0.EndGame:
        return EndGame_V2018_11_14_0.deserialize(reader);
      case RootPacketTags_V2018_11_14_0.GameData:
      case RootPacketTags_V2018_11_14_0.GameDataTo:
        return GameObjectSet_V2018_11_14_0.deserialize(reader, reader.getTag(), context);
      case RootPacketTags_V2018_11_14_0.GetGameList:
        if (side === PacketSender.Client) {
          return GetGameListC2S_V2018_11_14_0.deserialize(reader);
        } else if (side === PacketSender.Server) {
          return GetGameListS2C_V2018_11_14_0.deserialize(reader);
        } else {
          // Inferring

          const c2sAttempt = GetGameListC2S_V2018_11_14_0.tryDeserialize(reader.clone());
          const s2cAttempt = GetGameListS2C_V2018_11_14_0.tryDeserialize(reader.clone());

          if (s2cAttempt && c2sAttempt)
            return new AmbigousPacket(c2sAttempt, s2cAttempt);

          if (c2sAttempt)
            return c2sAttempt;

          if (s2cAttempt)
            return s2cAttempt

          throw new Error("Failed to infer packet sender for GetGameList packet, both S2C and C2S failed to parse.");
        }
      case RootPacketTags_V2018_11_14_0.HostGame:
        if (side === PacketSender.Client) {
          return HostGameC2SPacket_V2018_11_14_0.desrialize(reader);
        } else if (side === PacketSender.Server) {
          return HostGameS2CPacket_V2018_11_14_0.deserialize(reader);
        } else {
          // Inferring

          const c2sAttempt = HostGameC2SPacket_V2018_11_14_0.tryDeserialize(reader.clone());
          const s2cAttempt = HostGameS2CPacket_V2018_11_14_0.tryDeserialize(reader.clone());

          if (c2sAttempt && s2cAttempt)
            return new AmbigousPacket(c2sAttempt, s2cAttempt);

          if (c2sAttempt)
            return c2sAttempt;

          if (s2cAttempt)
            return s2cAttempt;

          throw new Error("Failed to infer packet sender for GetGameList packet.");
        }
      case RootPacketTags_V2018_11_14_0.JoinGame:
        if (side === PacketSender.Client) {
          return JoinGameC2S_V2018_11_14_0.deserialize(reader);
        } else if (side === PacketSender.Server) {
          return JoinGameS2C_V2018_11_14_0.deserialize(reader);
        } else {
          // infer

          const c2sAttempt = JoinGameC2S_V2018_11_14_0.tryDeserialize(reader);
          const s2cAttempt = JoinGameS2C_V2018_11_14_0.tryDeserialize(reader);

          if (c2sAttempt && s2cAttempt)
            return new AmbigousPacket(c2sAttempt, s2cAttempt);

          if (c2sAttempt)
            return c2sAttempt;

          if (s2cAttempt)
            return s2cAttempt;

          throw new Error("Failed to infer packet sender for GetGameList packet.");
        }
      case RootPacketTags_V2018_11_14_0.JoinedGame:
        if (side === PacketSender.Client) {
          throw new Error("Did not expect Client to send a JoinedGame");
        } else {
          return JoinedGameS2C_V2018_11_14_0.deserialize(reader);
        }
      case RootPacketTags_V2018_11_14_0.KickPlayer:
        return KickPlayer_V2018_11_14_0.deserialize(reader);
      case RootPacketTags_V2018_11_14_0.RemoveGame:
        if (side === PacketSender.Client) {
          return RemoveGameC2S_V2018_11_14_0.deserialize(reader);
        } else if (side === PacketSender.Server) {
          return RemoveGameS2C_V2018_11_14_0.deserialize(reader);
        } else {
          // Inferring

          const c2sAttempt = RemoveGameC2S_V2018_11_14_0.tryDeserialize(reader);
          const s2cAttempt = RemoveGameS2C_V2018_11_14_0.tryDeserialize(reader);

          if (c2sAttempt && s2cAttempt)
            return new AmbigousPacket(c2sAttempt, s2cAttempt);

          if (c2sAttempt)
            return c2sAttempt;

          if (s2cAttempt)
            return s2cAttempt;

          throw new Error("Failed to infer packet sender for GetGameList packet.");
        }
      case RootPacketTags_V2018_11_14_0.RemovePlayer:
        if (side === PacketSender.Client) {
          throw new Error("Did not expect Client to send a RemovePlayer");
        } else {
          return RemovePlayerS2C_V2018_11_14_0.deserialize(reader);
        }
      case RootPacketTags_V2018_11_14_0.StartGame:
        if (side === PacketSender.Client) {
          return StartGameC2S_V2018_11_14_0.deserialize(reader);
        } else if (side === PacketSender.Server) {
          return StartGameS2C_V2018_11_14_0.deserialize(reader);
        } else {
          // Inferring

          const c2sAttempt = StartGameC2S_V2018_11_14_0.tryDeserialize(reader);
          const s2cAttempt = StartGameS2C_V2018_11_14_0.tryDeserialize(reader);

          if (c2sAttempt && s2cAttempt)
            return new AmbigousPacket(c2sAttempt, s2cAttempt);

          if (c2sAttempt)
            return c2sAttempt;

          if (s2cAttempt)
            return s2cAttempt;

          throw new Error("Failed to infer packet sender for GetGameList packet.");
        }
      case RootPacketTags_V2018_11_14_0.WaitForHost:
        if (side === PacketSender.Client) {
          throw new Error("Did not expect Client to send a WaitForHost");
        } else {
          return WaitForHostS2C_V2018_11_14_0.deserialize(reader);
        }
      default:
        throw new Error(`Unknown packet tag: ${reader.getTag()}`)
    }
  }

  createAlterGamePacket(data: AlterGame) {
    return AlterGame_V2018_11_14_0.fromAbstract(data);
  }

  createEndGamePacket(data: EndGame) {
    return EndGame_V2018_11_14_0.fromAbstract(data);
  }

  createGameObjectSetPacket(data: GameObjectSet) {
    return GameObjectSet_V2018_11_14_0.fromAbstract(data);
  }

  createGetGameListPacket(data: GetGameListC2S): GetGameListC2S_V2018_11_14_0;
  createGetGameListPacket(data: GetGameListS2C): GetGameListS2C_V2018_11_14_0;
  createGetGameListPacket(data: GetGameListC2S | GetGameListS2C) {
    if (data instanceof GetGameListC2S) {
      return GetGameListC2S_V2018_11_14_0.fromAbstract(data);
    }

    return GetGameListS2C_V2018_11_14_0.fromAbstract(data);
  }

  createHostGamePacket(data: HostGameC2S): HostGameC2SPacket_V2018_11_14_0;
  createHostGamePacket(data: HostGameS2C): HostGameS2CPacket_V2018_11_14_0;
  createHostGamePacket(data: HostGameC2S | HostGameS2C) {
    if (data instanceof HostGameC2S) {
      return HostGameC2SPacket_V2018_11_14_0.fromAbstract(data);
    }

    return HostGameS2CPacket_V2018_11_14_0.fromAbstrasct(data);
  }

  createJoinGamePacket(data: JoinGameS2CRejection): JoinGameS2CRejection_V2018_11_14_0;
  createJoinGamePacket(data: JoinGameS2CBroadcast): JoinGameS2CBroadcast_V2018_11_14_0;
  createJoinGamePacket(data: JoinGameC2S): JoinGameC2S_V2018_11_14_0;
  createJoinGamePacket(data: JoinGameS2CRejection | JoinGameS2CBroadcast | JoinGameC2S) {
    if (data instanceof JoinGameC2S) {
      return JoinGameC2S_V2018_11_14_0.fromAbstract(data);
    }

    if (data instanceof JoinGameS2CBroadcast) {
      return JoinGameS2CBroadcast_V2018_11_14_0.fromAbstract(data);
    }

    return JoinGameS2CRejection_V2018_11_14_0.fromAbstract(data);
  }

  createJoinedGamePacket(data: JoinedGameS2C) {
    return JoinedGameS2C_V2018_11_14_0.fromAbstract(data);
  }

  createKickPlayerPacket(data: KickPlayer) {
    return KickPlayer_V2018_11_14_0.fromAbstract(data);
  }

  createRemovePlayerPacket(data: RemovePlayerS2C) {
    return RemovePlayerS2C_V2018_11_14_0.fromAbstract(data);
  }

  createRemoveGamePacket(data: RemoveGameS2C): RemoveGameS2C_V2018_11_14_0;
  createRemoveGamePacket(data: RemoveGameC2S): RemoveGameC2S_V2018_11_14_0;
  createRemoveGamePacket(data: RemoveGameS2C | RemoveGameC2S) {
    if (data instanceof RemoveGameC2S) {
      return RemoveGameC2S_V2018_11_14_0.fromAbstract(data);
    }

    return RemoveGameS2C_V2018_11_14_0.fromAbstract(data);
  }

  createStartGamePacket(data: StartGameS2C): StartGameS2C_V2018_11_14_0;
  createStartGamePacket(data: StartGameC2S): StartGameC2S_V2018_11_14_0;
  createStartGamePacket(data: StartGameS2C | StartGameC2S) {
    if (data instanceof StartGameC2S) {
      return StartGameC2S_V2018_11_14_0.fromAbstract(data);
    }

    return StartGameS2C_V2018_11_14_0.fromAbstract(data);
  }

  createWaitForHostPacket(data: WaitForHostS2C) {
    return WaitForHostS2C_V2018_11_14_0.fromAbstract(data)
  }
}
