import BaseStitchRequestClient from "./BaseStitchRequestClient";
import EventStream from "./EventStream";
import Response from "./Response";
import { StitchRequest } from "./StitchRequest";
import Transport from "./Transport";
export default class StitchRequestClient extends BaseStitchRequestClient {
    constructor(baseUrl: string, transport: Transport);
    doRequest(stitchReq: StitchRequest): Promise<Response>;
    doStreamRequest(stitchReq: StitchRequest, open?: boolean, retryRequest?: () => Promise<EventStream>): Promise<EventStream>;
    getBaseURL(): Promise<string>;
}
