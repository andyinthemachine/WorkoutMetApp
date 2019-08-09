"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserPasswordAuthProviderClientImpl_1 = __importDefault(require("./internal/UserPasswordAuthProviderClientImpl"));
var UserPasswordAuthProviderClient;
(function (UserPasswordAuthProviderClient) {
    UserPasswordAuthProviderClient.factory = new (function () {
        function class_1() {
        }
        class_1.prototype.getClient = function (authRequestClient, requestClient, routes) {
            return new UserPasswordAuthProviderClientImpl_1.default(requestClient, routes);
        };
        return class_1;
    }())();
})(UserPasswordAuthProviderClient = exports.UserPasswordAuthProviderClient || (exports.UserPasswordAuthProviderClient = {}));
//# sourceMappingURL=UserPasswordAuthProviderClient.js.map