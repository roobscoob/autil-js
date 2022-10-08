import { BinaryReader } from "@autil/helpers"
import { V1HelloPacket } from "."

test("exposes proper isObject calls", () => {
  const packet = new V1HelloPacket(0, 0, new ArrayBuffer(0));

  expect(packet.isAcknowledgement()).toBe(false);
  expect(packet.isDisconnect()).toBe(false);
  expect(packet.isHello()).toBe(true);
  expect(packet.isNormal()).toBe(false);
  expect(packet.isPing()).toBe(false);
  expect(packet.isReliable()).toBe(false);
  expect(packet.shouldAcknowledge()).toBe(true);
})

test("deserializes properly", () => {
  const binary = BinaryReader.from(Buffer.from("1122014142", "hex"))
  const packet = V1HelloPacket.deserialize(binary);

  expect(packet.getNonce()).toBe(0x1122);
  expect(packet.getHazelVersion()).toBe(1);

  const expected = Buffer.from("4142", "hex");

  expect(packet.countRemainingBytes()).toBe(expected.length);

  for (let i = 0; i < 2; i++) {
    expect(packet.readUInt8()).toEqual(expected.readUInt8(i));
  }
})

test("serializes properly", () => {
  const packet = new V1HelloPacket(0x1122, 1, Uint8Array.from([0x11, 0x22, 0xF0]).buffer);
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("081122011122F0", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})
