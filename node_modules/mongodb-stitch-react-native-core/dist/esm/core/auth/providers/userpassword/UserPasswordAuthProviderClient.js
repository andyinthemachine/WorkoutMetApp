import UserPasswordAuthProviderClientImpl from "./internal/UserPasswordAuthProviderClientImpl";
export var UserPasswordAuthProviderClient;
(function (UserPasswordAuthProviderClient) {
    UserPasswordAuthProviderClient.factory = new (function () {
        function class_1() {
        }
        class_1.prototype.getClient = function (authRequestClient, requestClient, routes) {
            return new UserPasswordAuthProviderClientImpl(requestClient, routes);
        };
        return class_1;
    }())();
})(UserPasswordAuthProviderClient || (UserPasswordAuthProviderClient = {}));
//# sourceMappingURL=UserPasswordAuthProviderClient.js.map