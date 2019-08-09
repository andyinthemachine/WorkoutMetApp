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
var StitchClientErrorCode_1 = require("./StitchClientErrorCode");
var StitchError_1 = __importDefault(require("./StitchError"));
var StitchClientError = (function (_super) {
    __extends(StitchClientError, _super);
    function StitchClientError(errorCode) {
        var _this = this;
        var message = "(" + StitchClientErrorCode_1.StitchClientErrorCode[errorCode] + "): " + StitchClientErrorCode_1.clientErrorCodeDescs[errorCode];
        _this = _super.call(this, message) || this;
        _this.errorCode = errorCode;
        _this.errorCodeName = StitchClientErrorCode_1.StitchClientErrorCode[errorCode];
        return _this;
    }
    return StitchClientError;
}(StitchError_1.default));
exports.default = StitchClientError;
//# sourceMappingURL=StitchClientError.js.map