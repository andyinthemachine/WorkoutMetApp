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
import Assertions from "../../../internal/common/Assertions";
import StitchUserProfileImpl from "../StitchUserProfileImpl";
import ApiStitchUserIdentity from "./ApiStitchUserIdentity";
var Fields;
(function (Fields) {
    Fields["DATA"] = "data";
    Fields["USER_TYPE"] = "type";
    Fields["IDENTITIES"] = "identities";
})(Fields || (Fields = {}));
var ApiCoreUserProfile = (function (_super) {
    __extends(ApiCoreUserProfile, _super);
    function ApiCoreUserProfile(userType, data, identities) {
        return _super.call(this, userType, data, identities) || this;
    }
    ApiCoreUserProfile.fromJSON = function (json) {
        Assertions.keyPresent(Fields.USER_TYPE, json);
        Assertions.keyPresent(Fields.DATA, json);
        Assertions.keyPresent(Fields.IDENTITIES, json);
        return new ApiCoreUserProfile(json[Fields.USER_TYPE], json[Fields.DATA], json[Fields.IDENTITIES].map(ApiStitchUserIdentity.fromJSON));
    };
    ApiCoreUserProfile.prototype.toJSON = function () {
        var _a;
        return _a = {},
            _a[Fields.DATA] = this.data,
            _a[Fields.USER_TYPE] = this.userType,
            _a[Fields.IDENTITIES] = this.identities,
            _a;
    };
    return ApiCoreUserProfile;
}(StitchUserProfileImpl));
export default ApiCoreUserProfile;
//# sourceMappingURL=ApiCoreUserProfile.js.map