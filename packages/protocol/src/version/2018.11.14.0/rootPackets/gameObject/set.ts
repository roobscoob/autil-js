import { MessageReader, MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { GameObject_V2018_11_14_0 } from ".";
import { SocketContext } from "../../../../staticFactory/context";
import { GameObjectSet } from "../../../abstract/rootPackets/gameObject";
import { GameCode } from "../../../abstract/types/gameCode";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";
import { GameCode_V2018_11_14_0 } from "../../types/gameCode";

export class GameObjectSet_V2018_11_14_0 extends GameObjectSet {
  static fromAbstract(data: GameObjectSet) {
    return new GameObjectSet_V2018_11_14_0(
      GameCode_V2018_11_14_0.fromAbstract(data.getGameCode()),
      data.getRecipientClientId(),
      data.getObjects().map(o => GameObject_V2018_11_14_0.fromAbstract(o))
    )
  }

  static deserialize(reader: BinaryReader, tag: number, context: SocketContext): GameObjectSet_V2018_11_14_0 {
    return new GameObjectSet_V2018_11_14_0(
      reader.read(GameCode_V2018_11_14_0),
      tag == 6 ? reader.readPackedInt32() : undefined,
      [...reader.readRemaining(r => r.read(MessageReader).read(GameObject_V2018_11_14_0, context))]
    );
  }

  constructor(
    protected readonly gameCode: GameCode_V2018_11_14_0,
    protected readonly targetClientId: number | undefined,
    protected readonly objects: GameObject_V2018_11_14_0[],
  ) { super() }

  getGameCode() { return this.gameCode }
  getRecipientClientId() { return this.targetClientId }
  getObjects() { return this.objects }

  serialize(): MessageWriter {
    const tag = this.targetClientId === undefined ? RootPacketTags_V2018_11_14_0.GameData : RootPacketTags_V2018_11_14_0.GameDataTo;
    const serializedObjects = this.getObjects().map(object => object.serialize().serialize().getBuffer());

    const writer = MessageWriter.allocateTagged(tag, (tag === RootPacketTags_V2018_11_14_0.GameData ? 4 : 10) + serializedObjects.reduce((p, c) => p + c.byteLength, 0));

    writer.write(this.gameCode);

    if (this.targetClientId !== undefined)
      writer.writePackedInt32(this.targetClientId);

    for (const serializedObject of serializedObjects) {
      writer.writeBytes(serializedObject);
    }

    return writer;
  }
}
