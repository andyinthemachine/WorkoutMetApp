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
import AuthInfo from "../AuthInfo";
var Fields;
(function (Fields) {
    Fields["USER_ID"] = "user_id";
    Fields["DEVICE_ID"] = "device_id";
    Fields["ACCESS_TOKEN"] = "access_token";
    Fields["REFRESH_TOKEN"] = "refresh_token";
})(Fields || (Fields = {}));
var ApiAuthInfo = (function (_super) {
    __extends(ApiAuthInfo, _super);
    function ApiAuthInfo(userId, deviceId, accessToken, refreshToken) {
        return _super.call(this, userId, deviceId, accessToken, refreshToken) || this;
    }
    ApiAuthInfo.fromJSON = function (json) {
        return new ApiAuthInfo(json[Fields.USER_ID], json[Fields.DEVICE_ID], json[Fields.ACCESS_TOKEN], json[Fields.REFRESH_TOKEN]);
    };
    ApiAuthInfo.prototype.toJSON = function () {
        var _a;
        return _a = {},
            _a[Fields.USER_ID] = this.userId,
            _a[Fields.DEVICE_ID] = this.deviceId,
            _a[Fields.ACCESS_TOKEN] = this.accessToken,
            _a[Fields.REFRESH_TOKEN] = this.refreshToken,
            _a;
    };
    return ApiAuthInfo;
}(AuthInfo));
export default ApiAuthInfo;
//# sourceMappingURL=ApiAuthInfo.js.map