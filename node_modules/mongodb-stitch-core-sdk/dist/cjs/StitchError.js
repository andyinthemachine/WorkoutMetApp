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
Object.defineProperty(exports, "__esModule", { value: true });
var _Error = function (message) {
    Error.call(this, message);
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this);
    }
    this.message = message;
    this.name = this.constructor.name;
};
_Error.prototype = Object.create(Error.prototype);
var StitchError = (function (_super) {
    __extends(StitchError, _super);
    function StitchError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StitchError;
}(_Error));
exports.default = StitchError;
//# sourceMappingURL=StitchError.js.map