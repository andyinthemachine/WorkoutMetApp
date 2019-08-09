import { BasicRequest } from "./BasicRequest";
import EventStream from "./EventStream";
import Response from "./Response";
import Transport from "./Transport";
export default class FetchTransport implements Transport {
    roundTrip(request: BasicRequest): Promise<Response>;
    stream(request: BasicRequest, open?: boolean, retryRequest?: () => Promise<EventStream>): Promise<EventStream>;
}
