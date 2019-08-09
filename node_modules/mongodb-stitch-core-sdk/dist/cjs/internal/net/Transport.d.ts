import { BasicRequest } from "./BasicRequest";
import EventStream from "./EventStream";
import Response from "./Response";
interface Transport {
    roundTrip(request: BasicRequest): Promise<Response>;
    stream(request: BasicRequest, open: boolean, retryRequest?: () => Promise<EventStream>): Promise<EventStream>;
}
export default Transport;
