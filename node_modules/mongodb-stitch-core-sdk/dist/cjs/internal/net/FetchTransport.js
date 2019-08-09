"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Response_1 = __importDefault(require("./Response"));
var StitchClientError_1 = __importDefault(require("../../StitchClientError"));
var StitchClientErrorCode_1 = require("../../StitchClientErrorCode");
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var FetchTransport = (function () {
    function FetchTransport() {
    }
    FetchTransport.prototype.roundTrip = function (request) {
        var responsePromise = cross_fetch_1.default(request.url, {
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
            return new Response_1.default(headers, response.status, body);
        });
    };
    FetchTransport.prototype.stream = function (request, open, retryRequest) {
        if (open === void 0) { open = true; }
        throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.StreamingNotSupported);
    };
    return FetchTransport;
}());
exports.default = FetchTransport;
//# sourceMappingURL=FetchTransport.js.map