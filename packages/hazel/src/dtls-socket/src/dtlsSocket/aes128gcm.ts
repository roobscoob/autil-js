import * as forge from "node-forge";
//@ts-ignore
import arrayBufferEquals from "arraybuffer-equal";

export class Aes128Gcm {
  static KeySize = 16;
  static NonceSize = 12;
  static CipherTextOverhead = 16;

  static TagSize = 16;

  cipher: forge.cipher.BlockCipher;

  hashSubKey: ArrayBuffer;
  blockJ: ArrayBuffer;
  blockS: ArrayBuffer;
  blockZ: ArrayBuffer;
  blockV: ArrayBuffer;
  blockScratch: ArrayBuffer;

  constructor(public readonly key: ArrayBuffer) {
    const scratchSpace = new ArrayBuffer(96);
    this.hashSubKey = scratchSpace.slice(0, 16);
    this.blockJ = scratchSpace.slice(16, 32);
    this.blockS = scratchSpace.slice(32, 48);
    this.blockZ = scratchSpace.slice(48, 64);
    this.blockV = scratchSpace.slice(64, 80);
    this.blockScratch = scratchSpace.slice(80, 96);

    this.cipher = forge.cipher.createCipher("AES-ECB", forge.util.binary.raw.encode(new Uint8Array(key)));
    this.cipher.start({  });
    this.cipher.update(forge.util.createBuffer(this.hashSubKey))
    new Uint8Array(this.hashSubKey).set(forge.util.binary.raw.decode(this.cipher.output.data.slice(this.cipher.output.length() - 16)));
  }

  seal(nonce: ArrayBuffer, plaintext: ArrayBuffer, associatedData: ArrayBuffer) {
    if (nonce.byteLength !== Aes128Gcm.NonceSize) {
      throw new TypeError("Invalid nonce size: " + nonce.byteLength);
    }

    const output = new ArrayBuffer(plaintext.byteLength + Aes128Gcm.CipherTextOverhead);

    new Uint8Array(this.blockJ).set(new Uint8Array(nonce));
    this.gctr(new Uint8Array(output), this.blockJ, 2, plaintext);
    this.generateAuthTag(new Uint8Array(output).subarray(plaintext.byteLength), output.slice(0, plaintext.byteLength), associatedData);

    return output;
  }

  open(nonce: ArrayBuffer, ciphertext: ArrayBuffer, associatedData: ArrayBuffer) {
    if (nonce.byteLength !== Aes128Gcm.NonceSize) {
      throw new TypeError("Invalid nonce size: " + nonce.byteLength);
    }
    if (ciphertext.byteLength < Aes128Gcm.CipherTextOverhead) {
      throw new TypeError("Invalid ciphertext size: " + ciphertext.byteLength);
    }

    const output = new ArrayBuffer(ciphertext.byteLength - Aes128Gcm.CipherTextOverhead);

    const authTag = ciphertext.slice(ciphertext.byteLength - Aes128Gcm.TagSize);
    ciphertext = ciphertext.slice(0, ciphertext.byteLength - Aes128Gcm.TagSize);

    new Uint8Array(this.blockJ).set(new Uint8Array(nonce));

    this.generateAuthTag(new Uint8Array(this.blockScratch), ciphertext, associatedData);
    if (arrayBufferEquals(this.blockScratch, authTag)) {
      throw new Error("Bad auth.");
    }

    this.gctr(new Uint8Array(output), this.blockJ, 2, ciphertext);

    return output;
  }

  generateAuthTag(output: Uint8Array, ciphertext: ArrayBuffer, associatedData: ArrayBuffer) {
    new Uint8Array(this.blockS).fill(0);

    let fullBlocks = Math.floor(associatedData.byteLength / 16);
    this.ghash(this.blockS, associatedData, fullBlocks);
    if (fullBlocks * 16 < associatedData.byteLength) {
      new Uint8Array(this.blockScratch).fill(0);
      new Uint8Array(this.blockScratch).set(new Uint8Array(associatedData).slice(fullBlocks * 16));
      this.ghash(this.blockS, this.blockScratch, 1);
    }

    fullBlocks = Math.floor(ciphertext.byteLength / 16);
    this.ghash(this.blockS, ciphertext, fullBlocks);
    if (fullBlocks * 16 < ciphertext.byteLength) {
      new Uint8Array(this.blockScratch).fill(0);
      new Uint8Array(this.blockScratch).set(new Uint8Array(ciphertext).slice(fullBlocks * 16));
      this.ghash(this.blockS, this.blockScratch, 1);
    }

    const associatedDataLength = 8 * associatedData.byteLength;
    const ciphertextDataLength = 8 * ciphertext.byteLength;
    const view = new DataView(this.blockScratch);
    view.setBigInt64(0, BigInt(associatedDataLength));
    view.setBigInt64(8, BigInt(ciphertextDataLength));

    this.ghash(this.blockS, this.blockScratch, 1);
    this.gctr(output, this.blockJ, 1, this.blockS);
  }

  gctr(output: Uint8Array, counterBlock: ArrayBuffer, counter: number, data: ArrayBuffer) {
    let writeIdx = 0;
    const numBlocks = Math.floor((data.byteLength + 15) / 16);
    for (let i = 0; i < numBlocks; ++i) {
      new DataView(counterBlock).setInt32(12, counter, false);
      counter++;
      this.cipher.update(forge.util.createBuffer(counterBlock))
      new Uint8Array(this.blockScratch).set(forge.util.binary.raw.decode(this.cipher.output.data.slice(this.cipher.output.length() - 16)), 0);

      for (let j = 0; j < 16 && writeIdx < data.byteLength; ++j, ++writeIdx) {
        output[writeIdx] = new Uint8Array(data)[writeIdx] ^ new Uint8Array(this.blockScratch)[j];
      }
    }
  }

  ghash(output: ArrayBuffer, data: ArrayBuffer, numBlocks: number) {
    let readIdx = 0;
    for (let i = 0; i < numBlocks; ++i) {
      for (let j = 0; j < 16; ++j, ++readIdx) {
        new Uint8Array(output)[j] ^= new Uint8Array(data)[readIdx];
      }

      Aes128Gcm.multiplyGf128Elements(new Uint8Array(output), new Uint8Array(this.hashSubKey), new Uint8Array(this.blockZ), new Uint8Array(this.blockV));
    }
  }

  static multiplyGf128Elements(x: Uint8Array, y: Uint8Array, scratchZ: Uint8Array, scratchV: Uint8Array) {
    scratchZ.fill(0);
    scratchV.set(x);

    for (let i = 0; i < 128; ++i) {
      const bitIdx = 7 - (i % 8);
      if ((new Uint8Array(y)[Math.floor(i / 8)] & (1 << bitIdx)) > 0) {
        for (let j = 0; j < 16; ++j) {
          scratchZ[j] ^= scratchV[j];
        }
      }

      let carry = false;
      for (let j = 0; j < 16; ++j) {
        const newCarry = (scratchV[j] & 0x1) > 0;
        scratchV[j] >>= 1;
        if (carry) {
          scratchV[j] |= 0x80;
        }
        carry = newCarry;
      }
      if (carry) {
        scratchV[0] ^= 0xe1;
      }
    }

    x.set(scratchZ);
  }
}
