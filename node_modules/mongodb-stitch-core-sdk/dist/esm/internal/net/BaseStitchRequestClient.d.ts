import EventStream from "./EventStream";
import Response from "./Response";
import { StitchRequest } from "./StitchRequest";
import Transport from "./Transport";
export default abstract class BaseStitchRequestClient {
    protected readonly baseUrl: string;
    protected readonly transport: Transport;
    constructor(baseUrl: string, transport: Transport);
    protected doRequestToURL(stitchReq: StitchRequest, url: string): Promise<Response>;
    protected doStreamRequestToURL(stitchReq: StitchRequest, url: string, open?: boolean, retryRequest?: () => Promise<EventStream>): Promise<EventStream>;
    private buildRequest;
}
