"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StitchError_1 = __importDefault(require("./StitchError"));
var StitchRequestErrorCode_1 = require("./StitchRequestErrorCode");
var StitchRequestError = (function (_super) {
    __extends(StitchRequestError, _super);
    function StitchRequestError(underlyingError, errorCode) {
        var _this = this;
        var message = "(" + StitchRequestErrorCode_1.StitchRequestErrorCode[errorCode] + "): " + StitchRequestErrorCode_1.requestErrorCodeDescs[errorCode] + ": " + underlyingError.message;
        _this = _super.call(this, message) || this;
        _this.underlyingError = underlyingError;
        _this.errorCode = errorCode;
        _this.errorCodeName = StitchRequestErrorCode_1.StitchRequestErrorCode[errorCode];
        return _this;
    }
    return StitchRequestError;
}(StitchError_1.default));
exports.default = StitchRequestError;
//# sourceMappingURL=StitchRequestError.js.map