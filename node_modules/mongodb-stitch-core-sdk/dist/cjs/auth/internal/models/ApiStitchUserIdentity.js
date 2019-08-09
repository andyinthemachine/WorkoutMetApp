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
var StitchUserIdentity_1 = __importDefault(require("../../StitchUserIdentity"));
var Fields;
(function (Fields) {
    Fields["ID"] = "id";
    Fields["PROVIDER_TYPE"] = "provider_type";
})(Fields || (Fields = {}));
var ApiStitchUserIdentity = (function (_super) {
    __extends(ApiStitchUserIdentity, _super);
    function ApiStitchUserIdentity(id, providerType) {
        return _super.call(this, id, providerType) || this;
    }
    ApiStitchUserIdentity.fromJSON = function (json) {
        return new ApiStitchUserIdentity(json[Fields.ID], json[Fields.PROVIDER_TYPE]);
    };
    ApiStitchUserIdentity.prototype.toJSON = function () {
        var _a;
        return _a = {},
            _a[Fields.ID] = this.id,
            _a[Fields.PROVIDER_TYPE] = this.providerType,
            _a;
    };
    return ApiStitchUserIdentity;
}(StitchUserIdentity_1.default));
exports.default = ApiStitchUserIdentity;
//# sourceMappingURL=ApiStitchUserIdentity.js.map