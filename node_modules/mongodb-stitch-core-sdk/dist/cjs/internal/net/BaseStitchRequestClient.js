"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StitchErrorUtils_1 = require("../../internal/common/StitchErrorUtils");
var StitchError_1 = __importDefault(require("../../StitchError"));
var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));
var StitchRequestErrorCode_1 = require("../../StitchRequestErrorCode");
var BasicRequest_1 = require("./BasicRequest");
function inspectResponse(request, url, response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
        return response;
    }
    return StitchErrorUtils_1.handleRequestError(response);
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
            throw new StitchRequestError_1.default(error, StitchRequestErrorCode_1.StitchRequestErrorCode.TRANSPORT_ERROR);
        })
            .then(function (resp) { return inspectResponse(stitchReq, url, resp); });
    };
    BaseStitchRequestClient.prototype.doStreamRequestToURL = function (stitchReq, url, open, retryRequest) {
        if (open === void 0) { open = true; }
        return this.transport
            .stream(this.buildRequest(stitchReq, url), open, retryRequest)
            .catch(function (error) {
            if (error instanceof StitchError_1.default) {
                throw error;
            }
            throw new StitchRequestError_1.default(error, StitchRequestErrorCode_1.StitchRequestErrorCode.TRANSPORT_ERROR);
        });
    };
    BaseStitchRequestClient.prototype.buildRequest = function (stitchReq, url) {
        return new BasicRequest_1.BasicRequest.Builder()
            .withMethod(stitchReq.method)
            .withUrl("" + url + stitchReq.path)
            .withHeaders(stitchReq.headers)
            .withBody(stitchReq.body)
            .build();
    };
    return BaseStitchRequestClient;
}());
exports.default = BaseStitchRequestClient;
//# sourceMappingURL=BaseStitchRequestClient.js.map