import { BinaryWriter } from "@autil/helpers";
import * as forge from "node-forge";

export function expandSecret(key: ArrayBuffer, label: ArrayBuffer, initialSeed: ArrayBuffer, size: number): ArrayBuffer {
  const keyStr = forge.util.binary.raw.encode(new Uint8Array(key));
  const writer = new ArrayBuffer(size);
  let writeHead = 0;

  const roundSeed = BinaryWriter.allocate(label.byteLength + initialSeed.byteLength);

  roundSeed.writeBytes(label);
  roundSeed.writeBytes(initialSeed);

  let hashA = forge.util.binary.raw.encode(new Uint8Array(roundSeed.getBuffer().buffer));

  const input = new Uint8Array(new ArrayBuffer(1 + roundSeed.getBuffer().byteLength));
  input.set(new Uint8Array(roundSeed.getBuffer().buffer), 1);

  while (writeHead < size) {
    const hashAHmac = forge.hmac.create();
    hashAHmac.start("sha256", keyStr);
    hashAHmac.update(hashA);
    hashA = hashAHmac.digest().bytes();

    input.set(forge.util.binary.raw.decode(hashA));
  

    const roundOutputHmac = forge.hmac.create();
    roundOutputHmac.start("sha256", keyStr);
    roundOutputHmac.update(forge.util.binary.raw.encode(input));
    let roundOutput = forge.util.binary.raw.decode(roundOutputHmac.digest().bytes());

    if ((size - writeHead) < roundOutput.byteLength) {
      roundOutput = roundOutput.slice(0, size - writeHead);
    }

    new Uint8Array(writer).set(roundOutput, writeHead);
    writeHead += roundOutput.length;
  }

  return writer
}
