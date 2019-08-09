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
var StitchUserProfileImpl_1 = __importDefault(require("../StitchUserProfileImpl"));
var StoreStitchUserIdentity_1 = __importDefault(require("./StoreStitchUserIdentity"));
var Fields;
(function (Fields) {
    Fields["DATA"] = "data";
    Fields["USER_TYPE"] = "type";
    Fields["IDENTITIES"] = "identities";
})(Fields || (Fields = {}));
var StoreCoreUserProfile = (function (_super) {
    __extends(StoreCoreUserProfile, _super);
    function StoreCoreUserProfile(userType, data, identities) {
        var _this = _super.call(this, userType, data, identities) || this;
        _this.userType = userType;
        _this.data = data;
        _this.identities = identities;
        return _this;
    }
    StoreCoreUserProfile.decode = function (from) {
        return from
            ? new StoreCoreUserProfile(from[Fields.USER_TYPE], from[Fields.DATA], from[Fields.IDENTITIES].map(function (identity) {
                return StoreStitchUserIdentity_1.default.decode(identity);
            }))
            : undefined;
    };
    StoreCoreUserProfile.prototype.encode = function () {
        var _a;
        return _a = {},
            _a[Fields.DATA] = this.data,
            _a[Fields.USER_TYPE] = this.userType,
            _a[Fields.IDENTITIES] = this.identities.map(function (identity) { return identity.encode(); }),
            _a;
    };
    return StoreCoreUserProfile;
}(StitchUserProfileImpl_1.default));
exports.default = StoreCoreUserProfile;
//# sourceMappingURL=StoreCoreUserProfile.js.map