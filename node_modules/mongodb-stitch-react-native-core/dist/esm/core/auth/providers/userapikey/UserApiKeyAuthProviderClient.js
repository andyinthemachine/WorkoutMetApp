import UserApiKeyAuthProviderClientImpl from "./internal/UserApiKeyAuthProviderClientImpl";
export var UserApiKeyAuthProviderClient;
(function (UserApiKeyAuthProviderClient) {
    UserApiKeyAuthProviderClient.factory = new (function () {
        function class_1() {
        }
        class_1.prototype.getClient = function (authRequestClient, requestClient, routes) {
            return new UserApiKeyAuthProviderClientImpl(authRequestClient, routes);
        };
        return class_1;
    }())();
})(UserApiKeyAuthProviderClient || (UserApiKeyAuthProviderClient = {}));
//# sourceMappingURL=UserApiKeyAuthProviderClient.js.map