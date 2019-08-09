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
var StitchServiceErrorCode_1 = require("./StitchServiceErrorCode");
var StitchServiceError = (function (_super) {
    __extends(StitchServiceError, _super);
    function StitchServiceError(message, errorCode) {
        if (errorCode === void 0) { errorCode = StitchServiceErrorCode_1.StitchServiceErrorCode.Unknown; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.errorCode = errorCode;
        _this.errorCodeName = StitchServiceErrorCode_1.StitchServiceErrorCode[errorCode];
        return _this;
    }
    return StitchServiceError;
}(StitchError_1.default));
exports.default = StitchServiceError;
//# sourceMappingURL=StitchServiceError.js.map