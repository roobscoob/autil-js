import { GameObjectRpc } from "../gameObject/rpc";

export abstract class RpcStartMeeting extends GameObjectRpc {
  isRpcStartMeeting(): this is RpcStartMeeting {
    return true;
  }

  abstract getReportedBodyPlayerControlNetId(): number;
}

export class RpcStartMeetingData extends RpcStartMeeting {
  constructor(
    protected readonly netId: number,
    protected readonly reportedBodyPlayerControlNetId: number
  ) { super() }

  getNetId() { return this.netId }
  getReportedBodyPlayerControlNetId(): number {
    return this.reportedBodyPlayerControlNetId;
  }
}
