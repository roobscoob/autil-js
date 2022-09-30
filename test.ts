import * as hazel from "@autil/hazel";
import { NodeUdpSocket } from "@autil/node-udp-socket";
import { BinaryReader } from "@autil/helpers";
import { Aes128Gcm } from "@autil/hazel/src/dtls-socket/src/dtlsSocket/aes128gcm";

(() => {
  /*
    const nonce = Buffer.from("9a30cb330001000000000001", "hex");
    const key = Buffer.from("b4e68ac016d4e2615732b5c2e2b67dad", "hex");
    const pt = Buffer.from("14000000000600000000000c39ec0270fb4b28cd7ae286e4", "hex");
    const ad = Buffer.from("16fefd00010000000000010018", "hex");

    const aes = new Aes128Gcm(key);

    const output = aes.seal(nonce, pt, ad);

    console.log(Buffer.from(output).toString("hex"));

    console.log(output.toString("hex"));*/
  const client = hazel.V1HazelClient.connect(
    new hazel.DtlsSocket(new NodeUdpSocket("127.0.0.1", 22626)),
    { clientVersion: 0, username: "roobscoob" }
  );

  // const socket = new NodeUdpSocket("107.182.233.175", 22626);

  // socket.addRecieveHandler(b => console.log("RECV", b));

  // const buf = Buffer.from("16000000000000000000010041010000350000000000000035000016490937b36277304c6159da0f57e4d36a4ef5d215180ce35da8964aba618bc80101000002c02f01000008000a00040002001d", "hex");

  // socket.send(buf);
})();
