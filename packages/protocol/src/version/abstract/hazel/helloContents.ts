import { ClientVersion } from "../types/clientVersion";

export abstract class HelloContents {
  abstract getClientProtocolVersion(): ClientVersion;
  abstract getPlayerName(): string;
}

export class HelloContentsData extends HelloContents {
  constructor(
    protected readonly protocolVersion: ClientVersion,
    protected readonly name: string,
  ) { super() }

  getClientProtocolVersion() { return this.protocolVersion }
  getPlayerName() { return this.name }
}
