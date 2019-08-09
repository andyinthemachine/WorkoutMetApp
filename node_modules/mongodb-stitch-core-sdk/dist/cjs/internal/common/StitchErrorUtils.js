"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StitchError_1 = __importDefault(require("../../StitchError"));
var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));
var StitchRequestErrorCode_1 = require("../../StitchRequestErrorCode");
var StitchServiceError_1 = __importDefault(require("../../StitchServiceError"));
var StitchServiceErrorCode_1 = require("../../StitchServiceErrorCode");
var ContentTypes_1 = __importDefault(require("../net/ContentTypes"));
var Headers_1 = __importDefault(require("../net/Headers"));
var Fields;
(function (Fields) {
    Fields["ERROR"] = "error";
    Fields["ERROR_CODE"] = "error_code";
})(Fields || (Fields = {}));
function wrapDecodingError(err) {
    if (err instanceof StitchError_1.default) {
        return err;
    }
    return new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
}
exports.wrapDecodingError = wrapDecodingError;
function handleRequestError(response) {
    if (response.body === undefined) {
        throw new StitchServiceError_1.default("received unexpected status code " + response.statusCode, StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown);
    }
    var body;
    try {
        body = response.body;
    }
    catch (e) {
        throw new StitchServiceError_1.default("received unexpected status code " + response.statusCode, StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown);
    }
    var errorMsg = handleRichError(response, body);
    throw new StitchServiceError_1.default(errorMsg, StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown);
}
exports.handleRequestError = handleRequestError;
function handleRichError(response, body) {
    if (response.headers[Headers_1.default.CONTENT_TYPE] === undefined ||
        (response.headers[Headers_1.default.CONTENT_TYPE] !== undefined &&
            response.headers[Headers_1.default.CONTENT_TYPE] !== ContentTypes_1.default.APPLICATION_JSON)) {
        return body;
    }
    var bsonObj = JSON.parse(body);
    if (!(bsonObj instanceof Object)) {
        return body;
    }
    var doc = bsonObj;
    if (doc[Fields.ERROR] === undefined) {
        return body;
    }
    var errorMsg = doc[Fields.ERROR];
    if (doc[Fields.ERROR_CODE] === undefined) {
        return errorMsg;
    }
    var errorCode = doc[Fields.ERROR_CODE];
    throw new StitchServiceError_1.default(errorMsg, StitchServiceErrorCode_1.stitchServiceErrorCodeFromApi(errorCode));
}
//# sourceMappingURL=StitchErrorUtils.js.map