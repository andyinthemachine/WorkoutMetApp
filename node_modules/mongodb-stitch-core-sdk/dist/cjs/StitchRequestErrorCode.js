"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var StitchRequestErrorCode;
(function (StitchRequestErrorCode) {
    StitchRequestErrorCode[StitchRequestErrorCode["TRANSPORT_ERROR"] = 0] = "TRANSPORT_ERROR";
    StitchRequestErrorCode[StitchRequestErrorCode["DECODING_ERROR"] = 1] = "DECODING_ERROR";
    StitchRequestErrorCode[StitchRequestErrorCode["ENCODING_ERROR"] = 2] = "ENCODING_ERROR";
})(StitchRequestErrorCode = exports.StitchRequestErrorCode || (exports.StitchRequestErrorCode = {}));
exports.requestErrorCodeDescs = (_a = {},
    _a[StitchRequestErrorCode.TRANSPORT_ERROR] = "the request transport encountered an error communicating with Stitch",
    _a[StitchRequestErrorCode.DECODING_ERROR] = "an error occurred while decoding a response from Stitch",
    _a[StitchRequestErrorCode.ENCODING_ERROR] = "an error occurred while encoding a request for Stitch",
    _a);
//# sourceMappingURL=StitchRequestErrorCode.js.map