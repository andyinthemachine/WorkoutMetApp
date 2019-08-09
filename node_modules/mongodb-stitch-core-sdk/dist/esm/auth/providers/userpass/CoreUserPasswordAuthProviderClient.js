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
import Method from "../../../internal/net/Method";
import { StitchDocRequest } from "../../../internal/net/StitchDocRequest";
import CoreAuthProviderClient from "../internal/CoreAuthProviderClient";
import UserPasswordAuthProvider from "./UserPasswordAuthProvider";
var RegistrationFields;
(function (RegistrationFields) {
    RegistrationFields["EMAIL"] = "email";
    RegistrationFields["PASSWORD"] = "password";
})(RegistrationFields || (RegistrationFields = {}));
var ActionFields;
(function (ActionFields) {
    ActionFields["EMAIL"] = "email";
    ActionFields["PASSWORD"] = "password";
    ActionFields["TOKEN"] = "token";
    ActionFields["TOKEN_ID"] = "tokenId";
})(ActionFields || (ActionFields = {}));
var CoreUserPasswordAuthProviderClient = (function (_super) {
    __extends(CoreUserPasswordAuthProviderClient, _super);
    function CoreUserPasswordAuthProviderClient(providerName, requestClient, authRoutes) {
        if (providerName === void 0) { providerName = UserPasswordAuthProvider.DEFAULT_NAME; }
        var _this = this;
        var baseRoute = authRoutes.getAuthProviderRoute(providerName);
        _this = _super.call(this, providerName, requestClient, baseRoute) || this;
        return _this;
    }
    CoreUserPasswordAuthProviderClient.prototype.registerWithEmailInternal = function (email, password) {
        var _a;
        var reqBuilder = new StitchDocRequest.Builder();
        reqBuilder
            .withMethod(Method.POST)
            .withPath(this.getRegisterWithEmailRoute());
        reqBuilder.withDocument((_a = {},
            _a[RegistrationFields.EMAIL] = email,
            _a[RegistrationFields.PASSWORD] = password,
            _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
    };
    CoreUserPasswordAuthProviderClient.prototype.confirmUserInternal = function (token, tokenId) {
        var _a;
        var reqBuilder = new StitchDocRequest.Builder();
        reqBuilder.withMethod(Method.POST).withPath(this.getConfirmUserRoute());
        reqBuilder.withDocument((_a = {},
            _a[ActionFields.TOKEN] = token,
            _a[ActionFields.TOKEN_ID] = tokenId,
            _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
    };
    CoreUserPasswordAuthProviderClient.prototype.resendConfirmationEmailInternal = function (email) {
        var _a;
        var reqBuilder = new StitchDocRequest.Builder();
        reqBuilder
            .withMethod(Method.POST)
            .withPath(this.getResendConfirmationEmailRoute());
        reqBuilder.withDocument((_a = {}, _a[ActionFields.EMAIL] = email, _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
    };
    CoreUserPasswordAuthProviderClient.prototype.resetPasswordInternal = function (token, tokenId, password) {
        var _a;
        var reqBuilder = new StitchDocRequest.Builder();
        reqBuilder.withMethod(Method.POST).withPath(this.getResetPasswordRoute());
        reqBuilder.withDocument((_a = {},
            _a[ActionFields.TOKEN] = token,
            _a[ActionFields.TOKEN_ID] = tokenId,
            _a[ActionFields.PASSWORD] = password,
            _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
    };
    CoreUserPasswordAuthProviderClient.prototype.sendResetPasswordEmailInternal = function (email) {
        var _a;
        var reqBuilder = new StitchDocRequest.Builder();
        reqBuilder
            .withMethod(Method.POST)
            .withPath(this.getSendResetPasswordEmailRoute());
        reqBuilder.withDocument((_a = {}, _a[ActionFields.EMAIL] = email, _a));
        return this.requestClient.doRequest(reqBuilder.build()).then(function () { });
    };
    CoreUserPasswordAuthProviderClient.prototype.getRegisterWithEmailRoute = function () {
        return this.getExtensionRoute("register");
    };
    CoreUserPasswordAuthProviderClient.prototype.getConfirmUserRoute = function () {
        return this.getExtensionRoute("confirm");
    };
    CoreUserPasswordAuthProviderClient.prototype.getResendConfirmationEmailRoute = function () {
        return this.getExtensionRoute("confirm/send");
    };
    CoreUserPasswordAuthProviderClient.prototype.getResetPasswordRoute = function () {
        return this.getExtensionRoute("reset");
    };
    CoreUserPasswordAuthProviderClient.prototype.getSendResetPasswordEmailRoute = function () {
        return this.getExtensionRoute("reset/send");
    };
    CoreUserPasswordAuthProviderClient.prototype.getExtensionRoute = function (path) {
        return this.baseRoute + "/" + path;
    };
    return CoreUserPasswordAuthProviderClient;
}(CoreAuthProviderClient));
export default CoreUserPasswordAuthProviderClient;
//# sourceMappingURL=CoreUserPasswordAuthProviderClient.js.map