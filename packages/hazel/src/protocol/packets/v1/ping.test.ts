import { BinaryReader } from "@autil/helpers"
import { V1PingPacket } from ".";

test("exposes proper isObject calls", () => {
  const packet = new V1PingPacket(0);

  expect(packet.isAcknowledgement()).toBe(false);
  expect(packet.isDisconnect()).toBe(false);
  expect(packet.isHello()).toBe(false);
  expect(packet.isNormal()).toBe(false);
  expect(packet.isPing()).toBe(true);
  expect(packet.isReliable()).toBe(false);
  expect(packet.shouldAcknowledge()).toBe(true);
})

test("deserializes properly", () => {
  const binary = BinaryReader.from(Buffer.from("1122", "hex"))
  const packet = V1PingPacket.deserialize(binary);

  expect(packet.getNonce()).toBe(0x1122);
})

test("serializes properly", () => {
  const packet = new V1PingPacket(0x1122);
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("0C1122", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})
