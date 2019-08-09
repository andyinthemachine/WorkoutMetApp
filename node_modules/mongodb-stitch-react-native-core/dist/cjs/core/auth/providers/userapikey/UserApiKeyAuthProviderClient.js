"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserApiKeyAuthProviderClientImpl_1 = __importDefault(require("./internal/UserApiKeyAuthProviderClientImpl"));
var UserApiKeyAuthProviderClient;
(function (UserApiKeyAuthProviderClient) {
    UserApiKeyAuthProviderClient.factory = new (function () {
        function class_1() {
        }
        class_1.prototype.getClient = function (authRequestClient, requestClient, routes) {
            return new UserApiKeyAuthProviderClientImpl_1.default(authRequestClient, routes);
        };
        return class_1;
    }())();
})(UserApiKeyAuthProviderClient = exports.UserApiKeyAuthProviderClient || (exports.UserApiKeyAuthProviderClient = {}));
//# sourceMappingURL=UserApiKeyAuthProviderClient.js.map