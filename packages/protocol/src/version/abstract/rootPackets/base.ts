import { AlterGame } from "./alterGame"
import { AmbigousPacket } from "./ambigous"
import { EndGame } from "./endGame"
import { GameObjectSet } from "./gameObject"
import { GetGameListC2S, GetGameListS2C } from "./getGameList"
import { HostGameC2S, HostGameS2C } from "./hostGame"
import { JoinedGameS2C } from "./joinedGame"
import { JoinGameC2S, JoinGameS2CBroadcast, JoinGameS2CRejection } from "./joinGame"
import { KickPlayer } from "./kickPlayer"
import { RemoveGameS2C, RemoveGameC2S } from "./removeGame"
import { RemovePlayerS2C } from "./removePlayer"
import { StartGameS2C, StartGameC2S } from "./startGame"
import { WaitForHostS2C } from "./waitForHost"

export abstract class BaseRootPacket {
  isAlterGame(): this is AlterGame { return false }
  isEndGame(): this is EndGame { return false }
  isGetGameListC2S(): this is GetGameListC2S { return false }
  isGetGameListS2C(): this is GetGameListS2C { return false }
  isHostGameC2S(): this is HostGameC2S { return false }
  isHostGameS2C(): this is HostGameS2C { return false }
  isJoinedGameS2C(): this is JoinedGameS2C { return false }
  isJoinGameC2S(): this is JoinGameC2S { return false }
  isJoinGameS2CBroadcast(): this is JoinGameS2CBroadcast { return false }
  isJoinGameS2CRejection(): this is JoinGameS2CRejection { return false }
  isKickPlayer(): this is KickPlayer { return false }
  isGameObjectSet(): this is GameObjectSet { return false }
  isRemoveGameS2C(): this is RemoveGameS2C { return false }
  isRemoveGameC2S(): this is RemoveGameC2S { return false }
  isRemovePlayerS2C(): this is RemovePlayerS2C { return false }
  isStartGameS2C(): this is StartGameS2C { return false }
  isStartGameC2S(): this is StartGameC2S { return false }
  isWaitForHostS2C(): this is WaitForHostS2C { return false }
  isAmbigous(): this is AmbigousPacket { return false }
}
