import { BinaryReader } from "@autil/helpers"
import { MessageReader, V1ReliablePacket } from "../..";

test("exposes proper isObject calls", () => {
  const packet = new V1ReliablePacket(0x1122, []);

  expect(packet.isAcknowledgement()).toBe(false);
  expect(packet.isDisconnect()).toBe(false);
  expect(packet.isHello()).toBe(false);
  expect(packet.isNormal()).toBe(false);
  expect(packet.isPing()).toBe(false);
  expect(packet.isReliable()).toBe(true);
  expect(packet.shouldAcknowledge()).toBe(true);
})

test("deserializes no messages properly", () => {
  const binary = BinaryReader.from(Buffer.from("1122", "hex"))
  const packet = V1ReliablePacket.deserialize(binary);

  expect(packet.getNonce()).toBe(0x1122)

  const content = packet.getContent();

  expect(content.length).toBe(0);
})

test("deserializes a single message properly", () => {
  const binary = BinaryReader.from(Buffer.from("11220100ABCD", "hex"))
  const packet = V1ReliablePacket.deserialize(binary);

  expect(packet.getNonce()).toBe(0x1122)

  const content = packet.getContent();

  expect(content.length).toBe(1);

  const firstMessage = Buffer.from(content[0].getBuffer().buffer);
  const expected = Buffer.from("CD", "hex");

  expect(firstMessage.byteLength).toBe(expected.length);

  expect(content[0].getTag()).toBe(0xAB);

  for (let i = 0; i < firstMessage.byteLength; i++) {
    expect(firstMessage.readUInt8(i)).toEqual(expected.readUInt8(i));
  }
})

test("deserializes two messages properly", () => {
  const binary = BinaryReader.from(Buffer.from("11220100ABCD0100EFAB", "hex"))
  const packet = V1ReliablePacket.deserialize(binary);

  expect(packet.getNonce()).toBe(0x1122)

  const content = packet.getContent();

  expect(content.length).toBe(2);

  const firstMessage = Buffer.from(content[0].getBuffer().buffer);
  const firstExpected = Buffer.from("CD", "hex");

  expect(firstMessage.byteLength).toBe(firstExpected.length);
  expect(content[0].getTag()).toBe(0xAB);

  for (let i = 0; i < firstMessage.byteLength; i++) {
    expect(firstMessage.readUInt8(i)).toEqual(firstExpected.readUInt8(i));
  }

  const secondMessage = Buffer.from(content[1].getBuffer().buffer);
  const secondExpected = Buffer.from("AB", "hex");

  expect(firstExpected.byteLength).toBe(secondExpected.length);
  expect(content[1].getTag()).toBe(0xEF);

  for (let i = 0; i < secondMessage.byteLength; i++) {
    expect(secondMessage.readUInt8(i)).toEqual(secondExpected.readUInt8(i));
  }
})

test("serializes no messages properly", () => {
  const packet = new V1ReliablePacket(0x1122, []);
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("011122", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})

test("serializes a single message properly", () => {
  const packet = new V1ReliablePacket(0x1122, [
    MessageReader.fromTagged(0xAB, Uint8Array.from([0xCD]).buffer),
  ]);
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("0111220100ABCD", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})

test("serializes two messages properly", () => {
  const packet = new V1ReliablePacket(0x1122, [
    MessageReader.fromTagged(0xAB, Uint8Array.from([0xCD]).buffer),
    MessageReader.fromTagged(0xEF, Uint8Array.from([0xAB]).buffer),
  ]);
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("0111220100ABCD0100EFAB", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})
