import BaseStitchRequestClient from "./BaseStitchRequestClient";
import EventStream from "./EventStream";
import Response from "./Response";
import { StitchRequest } from "./StitchRequest";
import Transport from "./Transport";
export default class StitchAppRequestClient extends BaseStitchRequestClient {
    private readonly clientAppId;
    private readonly routes;
    private appMetadata?;
    constructor(clientAppId: string, baseUrl: string, transport: Transport);
    doRequest(stitchReq: StitchRequest): Promise<Response>;
    doStreamRequest(stitchReq: StitchRequest, open?: boolean, retryRequest?: () => Promise<EventStream>): Promise<EventStream>;
    getBaseURL(): Promise<string>;
    private initAppMetadata;
}
