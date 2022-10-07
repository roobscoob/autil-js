import { BinaryReader } from "@autil/helpers"
import { V1AcknowledgementPacket } from "."
import { Bitfield } from "../..";

test("exposes proper isObject calls", () => {
  const packet = new V1AcknowledgementPacket(0, Bitfield.fromSize(0));

  expect(packet.isAcknowledgement()).toBe(true);
  expect(packet.isDisconnect()).toBe(false);
  expect(packet.isHello()).toBe(false);
  expect(packet.isNormal()).toBe(false);
  expect(packet.isPing()).toBe(false);
  expect(packet.isReliable()).toBe(false);
  expect(packet.shouldAcknowledge()).toBe(false);
})

test("deserializes properly", () => {
  const binary = BinaryReader.from(Buffer.from("1122F0", "hex"))
  const packet = V1AcknowledgementPacket.deserialize(binary);

  expect(packet.getNonce()).toBe(0x1122);
  expect(packet.getAcknowledgementHistory().getFlag(0)).toBe(true);
  expect(packet.getAcknowledgementHistory().getFlag(1)).toBe(true);
  expect(packet.getAcknowledgementHistory().getFlag(2)).toBe(true);
  expect(packet.getAcknowledgementHistory().getFlag(3)).toBe(true);
  expect(packet.getAcknowledgementHistory().getFlag(4)).toBe(false);
  expect(packet.getAcknowledgementHistory().getFlag(5)).toBe(false);
  expect(packet.getAcknowledgementHistory().getFlag(6)).toBe(false);
  expect(packet.getAcknowledgementHistory().getFlag(7)).toBe(false);
})

test("serializes properly", () => {
  const packet = new V1AcknowledgementPacket(0x1122, Bitfield.fromBooleanArray([true, true, true, true, false, false, false, false]));
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("0A1122F0", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})
