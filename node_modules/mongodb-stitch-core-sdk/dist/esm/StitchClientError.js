var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { clientErrorCodeDescs, StitchClientErrorCode } from "./StitchClientErrorCode";
import StitchError from "./StitchError";
var StitchClientError = (function (_super) {
    __extends(StitchClientError, _super);
    function StitchClientError(errorCode) {
        var _this = this;
        var message = "(" + StitchClientErrorCode[errorCode] + "): " + clientErrorCodeDescs[errorCode];
        _this = _super.call(this, message) || this;
        _this.errorCode = errorCode;
        _this.errorCodeName = StitchClientErrorCode[errorCode];
        return _this;
    }
    return StitchClientError;
}(StitchError));
export default StitchClientError;
//# sourceMappingURL=StitchClientError.js.map