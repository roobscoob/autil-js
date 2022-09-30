import * as hazel from "@autil/hazel";
import { NodeUdpSocket } from "@autil/node-udp-socket";
import { BinaryReader } from "@autil/helpers";

(() => {
  const client = hazel.V1HazelClient.connect(
    new hazel.DtlsSocket(new NodeUdpSocket("107.182.233.175", 22626)),
    { clientVersion: 0, username: "roobscoob" }
  );

  // const socket = new NodeUdpSocket("107.182.233.175", 22626);

  // socket.addRecieveHandler(b => console.log("RECV", b));

  // const buf = Buffer.from("16000000000000000000010041010000350000000000000035000016490937b36277304c6159da0f57e4d36a4ef5d215180ce35da8964aba618bc80101000002c02f01000008000a00040002001d", "hex");

  // socket.send(buf);
})();
