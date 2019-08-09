import Response from "./Response";
import StitchClientError from "../../StitchClientError";
import { StitchClientErrorCode } from "../../StitchClientErrorCode";
import fetch from "cross-fetch";
var FetchTransport = (function () {
    function FetchTransport() {
    }
    FetchTransport.prototype.roundTrip = function (request) {
        var responsePromise = fetch(request.url, {
            body: request.body,
            headers: request.headers,
            method: request.method,
            mode: 'cors'
        });
        var responseTextPromise = responsePromise.then(function (response) {
            return response.text();
        });
        return Promise.all([responsePromise, responseTextPromise]).then(function (values) {
            var response = values[0];
            var body = values[1];
            var headers = {};
            response.headers.forEach(function (value, key) {
                headers[key] = value;
            });
            return new Response(headers, response.status, body);
        });
    };
    FetchTransport.prototype.stream = function (request, open, retryRequest) {
        if (open === void 0) { open = true; }
        throw new StitchClientError(StitchClientErrorCode.StreamingNotSupported);
    };
    return FetchTransport;
}());
export default FetchTransport;
//# sourceMappingURL=FetchTransport.js.map