import { HazelPacketFactory, V1PacketFactory } from "."

test("Constructs a V1Factory", () => {
  expect(HazelPacketFactory.fromVersion(1)).toBeInstanceOf(V1PacketFactory);
})
