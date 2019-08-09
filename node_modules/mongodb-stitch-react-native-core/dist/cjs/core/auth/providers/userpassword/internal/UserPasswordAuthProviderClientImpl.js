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
var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
var UserPasswordAuthProviderClientImpl = (function (_super) {
    __extends(UserPasswordAuthProviderClientImpl, _super);
    function UserPasswordAuthProviderClientImpl(requestClient, routes) {
        return _super.call(this, mongodb_stitch_core_sdk_1.UserPasswordAuthProvider.DEFAULT_NAME, requestClient, routes) || this;
    }
    UserPasswordAuthProviderClientImpl.prototype.registerWithEmail = function (email, password) {
        return _super.prototype.registerWithEmailInternal.call(this, email, password);
    };
    UserPasswordAuthProviderClientImpl.prototype.confirmUser = function (token, tokenId) {
        return _super.prototype.confirmUserInternal.call(this, token, tokenId);
    };
    UserPasswordAuthProviderClientImpl.prototype.resendConfirmationEmail = function (email) {
        return _super.prototype.resendConfirmationEmailInternal.call(this, email);
    };
    UserPasswordAuthProviderClientImpl.prototype.resetPassword = function (token, tokenId, password) {
        return _super.prototype.resetPasswordInternal.call(this, token, tokenId, password);
    };
    UserPasswordAuthProviderClientImpl.prototype.sendResetPasswordEmail = function (email) {
        return _super.prototype.sendResetPasswordEmailInternal.call(this, email);
    };
    return UserPasswordAuthProviderClientImpl;
}(mongodb_stitch_core_sdk_1.CoreUserPassAuthProviderClient));
exports.default = UserPasswordAuthProviderClientImpl;
//# sourceMappingURL=UserPasswordAuthProviderClientImpl.js.map