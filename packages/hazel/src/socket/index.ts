export abstract class ClientSocket {
  private errorHandlers: Set<(error: Error) => void> = new Set();
  private recieveHandlers: Set<(buffer: ArrayBuffer) => void> = new Set();

  abstract send(binary: ArrayBuffer): void;
  abstract connect(): Promise<void>;

  addRecieveHandler(handler: (binary: ArrayBuffer) => void): void {
    this.recieveHandlers.add(handler);
  }

  addErrorHandler(handler: (error: Error) => void): void {
    this.errorHandlers.add(handler);
  }

  protected emitRecieve(binary: ArrayBuffer): void {
    for (const handler of this.recieveHandlers) {
      handler(binary);
    }
  }

  protected emitError(error: Error): void {
    for (const handler of this.errorHandlers) {
      handler(error);
    }
  }
}

export abstract class ServerSocket<TClient> {
  private errorHandlers: Set<(error: Error, client?: TClient) => void> = new Set();
  private recieveHandlers: Set<(clinet: TClient, buffer: ArrayBuffer) => void> = new Set();

  abstract send(client: TClient, binary: ArrayBuffer): void;
  abstract listen(): Promise<void>;

  addRecieveHandler(handler: (client: TClient, binary: ArrayBuffer) => void): void {
    this.recieveHandlers.add(handler);
  }

  addErrorHandler(handler: (error: Error, client?: TClient) => void): void {
    this.errorHandlers.add(handler);
  }

  protected emitRecieve(client: TClient, binary: ArrayBuffer): void {
    for (const handler of this.recieveHandlers) {
      handler(client, binary);
    }
  }

  protected emitError(error: Error, client?: TClient): void {
    for (const handler of this.errorHandlers) {
      handler(error, client);
    }
  }
}
