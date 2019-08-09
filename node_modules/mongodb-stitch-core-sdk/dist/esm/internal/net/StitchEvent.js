import { EJSON } from "bson";
import StitchServiceError from "../../StitchServiceError";
import { StitchServiceErrorCode, stitchServiceErrorCodeFromApi } from "../../StitchServiceErrorCode";
import Event from "./Event";
var StitchEvent = (function () {
    function StitchEvent(eventName, data, decoder) {
        this.eventName = eventName;
        data = data ? data : "";
        var decodedStringBuffer = [];
        for (var chIdx = 0; chIdx < data.length; chIdx++) {
            var c = data[chIdx];
            switch (c) {
                case '%':
                    if (chIdx + 2 >= data.length) {
                        break;
                    }
                    var code = data.substring(chIdx + 1, chIdx + 3);
                    var found = void 0;
                    switch (code) {
                        case "25":
                            found = true;
                            decodedStringBuffer.push("%");
                            break;
                        case "0A":
                            found = true;
                            decodedStringBuffer.push("\n");
                            break;
                        case "0D":
                            found = true;
                            decodedStringBuffer.push("\r");
                            break;
                        default:
                            found = false;
                    }
                    if (found) {
                        chIdx += 2;
                        continue;
                    }
                    break;
                default:
                    break;
            }
            decodedStringBuffer.push(c);
        }
        var decodedData = decodedStringBuffer.join('');
        switch (this.eventName) {
            case StitchEvent.ERROR_EVENT_NAME:
                var errorMsg = void 0;
                var errorCode = void 0;
                try {
                    var errorDoc = EJSON.parse(decodedData, { strict: false });
                    errorMsg = errorDoc[ErrorFields.Error];
                    errorCode = stitchServiceErrorCodeFromApi(errorDoc[ErrorFields.ErrorCode]);
                }
                catch (error) {
                    errorMsg = decodedData;
                    errorCode = StitchServiceErrorCode.Unknown;
                }
                this.error = new StitchServiceError(errorMsg, errorCode);
                break;
            case Event.MESSAGE_EVENT:
                this.data = EJSON.parse(decodedData, { strict: false });
                if (decoder) {
                    this.data = decoder.decode(this.data);
                }
                break;
        }
    }
    StitchEvent.fromEvent = function (event, decoder) {
        return new StitchEvent(event.eventName, event.data, decoder);
    };
    StitchEvent.ERROR_EVENT_NAME = "error";
    return StitchEvent;
}());
export default StitchEvent;
var ErrorFields;
(function (ErrorFields) {
    ErrorFields["Error"] = "error";
    ErrorFields["ErrorCode"] = "error_code";
})(ErrorFields || (ErrorFields = {}));
//# sourceMappingURL=StitchEvent.js.map