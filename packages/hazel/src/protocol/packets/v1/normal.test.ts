import { BinaryReader } from "@autil/helpers"
import { V1NormalPacket } from "."
import { MessageReader } from "../..";

test("exposes proper isObject calls", () => {
  const packet = new V1NormalPacket([]);

  expect(packet.isAcknowledgement()).toBe(false);
  expect(packet.isDisconnect()).toBe(false);
  expect(packet.isHello()).toBe(false);
  expect(packet.isNormal()).toBe(true);
  expect(packet.isPing()).toBe(false);
  expect(packet.isReliable()).toBe(false);
  expect(packet.shouldAcknowledge()).toBe(false);
})

test("deserializes no messages properly", () => {
  const binary = BinaryReader.from(Buffer.from("", "hex"))
  const packet = V1NormalPacket.deserialize(binary);
  const content = packet.getContent();

  expect(content.length).toBe(0);
})

test("deserializes a single message properly", () => {
  const binary = BinaryReader.from(Buffer.from("0100ABCD", "hex"))
  const packet = V1NormalPacket.deserialize(binary);
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
  const binary = BinaryReader.from(Buffer.from("0100ABCD0100EFAB", "hex"))
  const packet = V1NormalPacket.deserialize(binary);
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
  const packet = new V1NormalPacket([]);
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("00", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})

test("serializes a single message properly", () => {
  const packet = new V1NormalPacket([
    MessageReader.fromTagged(0xAB, Uint8Array.from([0xCD]).buffer),
  ]);
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("000100ABCD", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})

test("serializes two messages properly", () => {
  const packet = new V1NormalPacket([
    MessageReader.fromTagged(0xAB, Uint8Array.from([0xCD]).buffer),
    MessageReader.fromTagged(0xEF, Uint8Array.from([0xAB]).buffer),
  ]);
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("000100ABCD0100EFAB", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})
