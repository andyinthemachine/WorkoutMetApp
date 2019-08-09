import { handleRequestError } from "../../internal/common/StitchErrorUtils";
import StitchError from "../../StitchError";
import StitchRequestError from "../../StitchRequestError";
import { StitchRequestErrorCode } from "../../StitchRequestErrorCode";
import { BasicRequest } from "./BasicRequest";
function inspectResponse(request, url, response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
        return response;
    }
    return handleRequestError(response);
}
var BaseStitchRequestClient = (function () {
    function BaseStitchRequestClient(baseUrl, transport) {
        this.baseUrl = baseUrl;
        this.transport = transport;
    }
    BaseStitchRequestClient.prototype.doRequestToURL = function (stitchReq, url) {
        return this.transport
            .roundTrip(this.buildRequest(stitchReq, url))
            .catch(function (error) {
            throw new StitchRequestError(error, StitchRequestErrorCode.TRANSPORT_ERROR);
        })
            .then(function (resp) { return inspectResponse(stitchReq, url, resp); });
    };
    BaseStitchRequestClient.prototype.doStreamRequestToURL = function (stitchReq, url, open, retryRequest) {
        if (open === void 0) { open = true; }
        return this.transport
            .stream(this.buildRequest(stitchReq, url), open, retryRequest)
            .catch(function (error) {
            if (error instanceof StitchError) {
                throw error;
            }
            throw new StitchRequestError(error, StitchRequestErrorCode.TRANSPORT_ERROR);
        });
    };
    BaseStitchRequestClient.prototype.buildRequest = function (stitchReq, url) {
        return new BasicRequest.Builder()
            .withMethod(stitchReq.method)
            .withUrl("" + url + stitchReq.path)
            .withHeaders(stitchReq.headers)
            .withBody(stitchReq.body)
            .build();
    };
    return BaseStitchRequestClient;
}());
export default BaseStitchRequestClient;
//# sourceMappingURL=BaseStitchRequestClient.js.map