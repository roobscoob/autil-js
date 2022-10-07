import { BinaryReader, BinaryWriter } from "@autil/helpers";
import { V1AcknowledgementPacket, V1DisconnectPacket, V1HelloPacket, V1NormalPacket, V1PacketFactory, V1PingPacket, V1ReliablePacket } from "."
import { Bitfield } from "../..";

const factory = new V1PacketFactory();

test("can produce acknowledgement", () => {
  const binary = BinaryReader.from(Buffer.from("0A1122F0", "hex"));
  const packet = factory.getPacket(binary);

  expect(packet).toBeInstanceOf(V1AcknowledgementPacket);
});

test("can produce disconnect", () => {
  const binary = BinaryReader.from(Buffer.from("09", "hex"));
  const packet = factory.getPacket(binary);

  expect(packet).toBeInstanceOf(V1DisconnectPacket);
});

test("can produce hello", () => {
  const binary = BinaryReader.from(Buffer.from("08112201", "hex"));
  const packet = factory.getPacket(binary);

  expect(packet).toBeInstanceOf(V1HelloPacket);
});

test("can produce normal", () => {
  const binary = BinaryReader.from(Buffer.from("00", "hex"));
  const packet = factory.getPacket(binary);

  expect(packet).toBeInstanceOf(V1NormalPacket);
});

test("can produce ping", () => {
  const binary = BinaryReader.from(Buffer.from("0C1122", "hex"));
  const packet = factory.getPacket(binary);

  expect(packet).toBeInstanceOf(V1PingPacket);
});

test("can produce reliable", () => {
  const binary = BinaryReader.from(Buffer.from("011122", "hex"));
  const packet = factory.getPacket(binary);

  expect(packet).toBeInstanceOf(V1ReliablePacket);
})

test("an unknown ID will result in an error", () => {
  const binary = BinaryReader.from(Buffer.from("FF", "hex"));

  expect(factory.getPacket.bind(factory, binary)).toThrowError(new Error(`Unknown packet ID: 255`))
})

test("createNormal", () => expect(factory.createNormal()).toBeInstanceOf(V1NormalPacket))
test("createReliable", () => expect(factory.createReliable(1)).toBeInstanceOf(V1ReliablePacket))
test("createHello", () => expect(factory.createHello(0, BinaryWriter.allocate(0))).toBeInstanceOf(V1HelloPacket))
test("createHelloFromSerializable", () => expect(factory.createHello(0, { serialize: () => BinaryWriter.allocate(0) })).toBeInstanceOf(V1HelloPacket))
test("createDisconnect", () => expect(factory.createDisconnect(BinaryWriter.allocate(0))).toBeInstanceOf(V1DisconnectPacket))
test("createDisconnectFromSerializable", () => expect(factory.createDisconnect({ serialize: () => BinaryWriter.allocate(0) })).toBeInstanceOf(V1DisconnectPacket))
test("createAcknowledgement", () => expect(factory.createAcknowledgement(0, Bitfield.fromSize(0))).toBeInstanceOf(V1AcknowledgementPacket))
test("createPing", () => expect(factory.createPing(0)).toBeInstanceOf(V1PingPacket))
