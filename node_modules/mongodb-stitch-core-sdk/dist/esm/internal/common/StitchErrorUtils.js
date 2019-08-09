import StitchError from "../../StitchError";
import StitchRequestError from "../../StitchRequestError";
import { StitchRequestErrorCode } from "../../StitchRequestErrorCode";
import StitchServiceError from "../../StitchServiceError";
import { StitchServiceErrorCode, stitchServiceErrorCodeFromApi } from "../../StitchServiceErrorCode";
import ContentTypes from "../net/ContentTypes";
import Headers from "../net/Headers";
var Fields;
(function (Fields) {
    Fields["ERROR"] = "error";
    Fields["ERROR_CODE"] = "error_code";
})(Fields || (Fields = {}));
export function wrapDecodingError(err) {
    if (err instanceof StitchError) {
        return err;
    }
    return new StitchRequestError(err, StitchRequestErrorCode.DECODING_ERROR);
}
export function handleRequestError(response) {
    if (response.body === undefined) {
        throw new StitchServiceError("received unexpected status code " + response.statusCode, StitchServiceErrorCode.Unknown);
    }
    var body;
    try {
        body = response.body;
    }
    catch (e) {
        throw new StitchServiceError("received unexpected status code " + response.statusCode, StitchServiceErrorCode.Unknown);
    }
    var errorMsg = handleRichError(response, body);
    throw new StitchServiceError(errorMsg, StitchServiceErrorCode.Unknown);
}
function handleRichError(response, body) {
    if (response.headers[Headers.CONTENT_TYPE] === undefined ||
        (response.headers[Headers.CONTENT_TYPE] !== undefined &&
            response.headers[Headers.CONTENT_TYPE] !== ContentTypes.APPLICATION_JSON)) {
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
    throw new StitchServiceError(errorMsg, stitchServiceErrorCodeFromApi(errorCode));
}
//# sourceMappingURL=StitchErrorUtils.js.map