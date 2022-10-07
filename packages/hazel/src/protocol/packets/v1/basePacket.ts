import type { V1AcknowledgementPacket, V1DisconnectPacket, V1HelloPacket, V1NormalPacket, V1PingPacket, V1ReliablePacket } from ".";

export abstract class BasePacket {
  isAcknowledgement(): this is V1AcknowledgementPacket { return false };
  isDisconnect(): this is V1DisconnectPacket { return false };
  isHello(): this is V1HelloPacket { return false };
  isNormal(): this is V1NormalPacket { return false };
  isPing(): this is V1PingPacket { return false };
  isReliable(): this is V1ReliablePacket { return false };

  shouldAcknowledge(): this is ReliableLikePacket { return false };
}

export interface ReliableLikePacket {
  getNonce(): number;
}
