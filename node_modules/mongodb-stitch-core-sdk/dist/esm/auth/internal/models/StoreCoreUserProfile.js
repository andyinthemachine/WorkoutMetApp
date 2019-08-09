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
import StitchUserProfileImpl from "../StitchUserProfileImpl";
import StoreStitchUserIdentity from "./StoreStitchUserIdentity";
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
                return StoreStitchUserIdentity.decode(identity);
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
}(StitchUserProfileImpl));
export default StoreCoreUserProfile;
//# sourceMappingURL=StoreCoreUserProfile.js.map