import { BinaryWriter } from "@autil/helpers";
import * as forge from "node-forge";

export function expandSecret(key: ArrayBuffer, label: ArrayBuffer, initialSeed: ArrayBuffer, size = 42): ArrayBuffer {
  const writer = new ArrayBuffer(size);
  let writeHead = 0;

  const roundSeed = BinaryWriter.allocate(label.byteLength + initialSeed.byteLength);

  roundSeed.writeBytes(label);
  roundSeed.writeBytes(initialSeed);

  let hashA = forge.util.binary.raw.encode(new Uint8Array(roundSeed.getBuffer().buffer));
  const hmac = forge.hmac.create();

  hmac.start("sha256", forge.util.binary.raw.encode(new Uint8Array(key)));

  const input = new Uint8Array(new ArrayBuffer(64 + roundSeed.getBuffer().byteLength));

  input.set(new Uint8Array(roundSeed.getBuffer().byteLength), 64);

  while (writeHead < size) {
    hmac.update(hashA);
    hashA = hmac.digest().bytes();

    input.set(forge.util.binary.raw.decode(hashA));

    hmac.update(forge.util.binary.raw.encode(input));
    let roundOutput = forge.util.binary.raw.decode(hmac.digest().bytes());

    if ((size - writeHead) < roundOutput.byteLength) {
      roundOutput = roundOutput.slice(0, size - writeHead);
    }

    new Uint8Array(writer).set(roundOutput, writeHead);

    writeHead += roundOutput.length;
  }

  return writer
}
