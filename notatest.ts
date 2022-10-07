// import * as hazel from "@autil/hazel";
// import { NodeUdpSocket } from "@autil/node-udp-socket";
// import { BinaryReader, BinaryWriter } from "@autil/helpers";
// import { HazelPacketFactory, MessageReader, MessageWriter } from "@autil/hazel";
// import { PacketFactory } from "./packages/protocol/src/staticFactory";
// import { ClientVersionData } from "./packages/protocol/src/version/abstract/types/clientVersion";
// import { JoinGameS2CBroadcastData } from "./packages/protocol/src/version/abstract/rootPackets/joinGame";
// import { GameCodeData } from "./packages/protocol/src/version/abstract/types/gameCode";
import { EosHttpApi } from "./packages/http-api/src/eos/api/requester";
import { InnerslothHttpApi } from "./packages/http-api/src/innersloth/api/requester";

(async () => {
  const deviceModel = EosHttpApi.generateRandomDeviceModel();
  const { access_token } = await EosHttpApi.authRequestGetDeviceIdAccessToken("xyza7891qtrmoYLr86we6DlfCA1RRsp8", "nGThQanzvthA2HPaARXe/xutzsKyx5WJveNkBx44ti4", deviceModel);
  const account = await EosHttpApi.authRequestEosAccessToken({
    grantType: "external_auth",
    externalAuthType: "deviceid_access_token",
    clientId: "xyza7891qtrmoYLr86we6DlfCA1RRsp8",
    clientSecret: "nGThQanzvthA2HPaARXe/xutzsKyx5WJveNkBx44ti4",
    deploymentId: "503cd077a7804777aee5a6eeb5cfe62d",
    nonce: "Testing",
    display_name: "roobscoob",
    externalAuthToken: access_token,
  })

  const mmToken = await InnerslothHttpApi.matchmakerGetToken("https://matchmaker-staging.among.us", account.id_token, account.product_user_id, 50559600, 0, "roobscoob")

  const games = await InnerslothHttpApi.matchmakerFind("https://matchmaker-staging.among.us", mmToken, {
    quickChat: "FreeChatOrQuickChat",
    // lang: 0,
    // mapId: 0,
    // numImpostors: 0,
    // platformFlags: 0,
  });

  console.log(games);

  // const writer = BinaryWriter.allocate(25);

  // writer.writeSInt32LE(50547300);
  // writer.writePackedInt32(1);
  // writer.writeString("A");
  // writer.writeUInt32LE(0);
  // writer.writeUInt32LE(0);
  // writer.writeUInt8(1);

  // const platformData = MessageWriter.allocateTagged(0, 2);

  // platformData.writePackedInt32(1);
  // platformData.writeString("A");

  // writer.write(platformData);

  // writer.writeSInt32LE(0);
  // writer.writeUInt8(0);

  // const client = new hazel.V1HazelClient(new NodeUdpSocket("127.0.0.1", 22023));

  // client.addDisconnectHandler(handler => {
  //   console.log("Disconnected", handler?.getBuffer());
  // })

  // client.connect(writer);

  // -------------- //

  // const hazelfactory = HazelPacketFactory.fromVersion(1);
  // const aufactory = PacketFactory.fromVersion(new ClientVersionData(2018, 11, 14, 0));

  // // unreliably sent host game
  // const rawbuffer = BinaryReader.from(Buffer.from("04000041414141"));

  // const hazelpacket = hazelfactory.getPacket(rawbuffer);

  // if (!hazelpacket.isNormal())
  //   throw new Error("Expected normal packet")

  // hazelpacket.getContent().forEach(packet => {
  //   const aupacket = aufactory.deserialize(packet);

  //   if (!aupacket.isHostGameS2C())
  //     throw new Error("Expected HostGameS2C");

  //   const gameCode = aupacket.getGameCode();

  //   if (gameCode.getCode() !== "AAAA")
  //     throw new Error("Expected GameCode AAAA");

  //   console.log("Worked :)")
  // })

  // // -------------- //

  // const jg = aufactory.createJoinGamePacket(new JoinGameS2CBroadcastData(new GameCodeData("ABCD"), 0, 1));
  // const hrjg = hazelfactory.createReliable(0, jg);

  // console.log(hrjg.serialize());
})();
