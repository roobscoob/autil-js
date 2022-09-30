export abstract class Socket {
  abstract send(binary: ArrayBuffer): void;
  abstract addRecieveHandler(handler: (binary: ArrayBuffer) => void): void;
  abstract addDisconnectHandler(handler: (reason?: string) => void): void;
  abstract connect(): Promise<void>;
}
