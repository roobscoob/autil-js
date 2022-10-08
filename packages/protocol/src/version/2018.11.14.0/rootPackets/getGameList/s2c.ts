import { MessageWriter } from "@autil/hazel";
import { BinaryReader } from "@autil/helpers";
import { GetGameListS2C } from "../../../abstract/rootPackets/getGameList";
import { RootPacketTags_V2018_11_14_0 } from "../../tags";
import { GameListing_V2018_11_14_0 } from "../../types/gameListing";

export class GetGameListS2C_V2018_11_14_0 extends GetGameListS2C {
  static fromAbstract(data: GetGameListS2C) {
    return new GetGameListS2C_V2018_11_14_0(
      data.getGameListings().map(listing => GameListing_V2018_11_14_0.fromAbstract(listing)),
    )
  }

  static tryDeserialize(reader: BinaryReader) {
    try {
      reader.readPackedInt32();
    } catch(err) {
      return undefined;
    }

    let listings: GameListing_V2018_11_14_0[] = [];

    while (reader.countRemainingBytes() > 0) {
      let listing: GameListing_V2018_11_14_0;

      try {
        listing = reader.read(GameListing_V2018_11_14_0);
      } catch(err) {
        return undefined;
      }

      listings.push(listing);
    }

    return new GetGameListS2C_V2018_11_14_0(listings);
  }

  static deserialize(reader: BinaryReader) {
    reader.readPackedInt32();

    return new GetGameListS2C_V2018_11_14_0(
      [...reader.readRemaining(r => r.read(GameListing_V2018_11_14_0))],
    );
  }

  constructor(
    protected readonly listings: GameListing_V2018_11_14_0[],
  ) { super() }

  getGameListings() { return this.listings }

  serialize(): MessageWriter {
    const writer = MessageWriter.allocateTagged(RootPacketTags_V2018_11_14_0.GetGameList,
      6 + this.getGameListings().reduce((p, c) => p + c.getHostName().length + 22, 0)
    )

    writer.writePackedInt32(this.getGameListings().length);

    for (const listing of this.getGameListings()) {
      writer.write(listing);
    }

    return writer;
  }
}
