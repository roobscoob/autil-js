import { BinaryReader } from "@autil/helpers"
import { V1DisconnectPacket } from "."
import { Bitfield } from "../..";

test("exposes proper isObject calls", () => {
  const packet = new V1DisconnectPacket(new ArrayBuffer(0));

  expect(packet.isAcknowledgement()).toBe(false);
  expect(packet.isDisconnect()).toBe(true);
  expect(packet.isHello()).toBe(false);
  expect(packet.isNormal()).toBe(false);
  expect(packet.isPing()).toBe(false);
  expect(packet.isReliable()).toBe(false);
  expect(packet.shouldAcknowledge()).toBe(false);
})

test("deserializes properly", () => {
  const binary = BinaryReader.from(Buffer.from("1122F0", "hex"))
  const packet = V1DisconnectPacket.deserialize(binary);
  const reason = Buffer.from(packet.getReason());
  const expected = Buffer.from("1122F0", "hex");

  expect(reason.byteLength).toBe(expected.length);

  for (let i = 0; i < reason.byteLength; i++) {
    expect(reason.readUInt8(i)).toEqual(expected.readUInt8(i));
  }
})

test("serializes properly", () => {
  const packet = new V1DisconnectPacket(Uint8Array.from([0x11, 0x22, 0xF0]).buffer);
  const binary = packet.serialize().getBuffer();
  const expected = Buffer.from("091122F0", "hex");

  expect(binary.byteLength).toBe(expected.length);

  for (let i = 0; i < binary.byteLength; i++) {
    expect(binary.getUint8(i)).toEqual(expected.readUInt8(i));
  }
})
