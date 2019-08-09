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
var StitchErrorUtils_1 = require("../../../internal/common/StitchErrorUtils");
var Method_1 = __importDefault(require("../../../internal/net/Method"));
var StitchAuthDocRequest_1 = require("../../../internal/net/StitchAuthDocRequest");
var StitchAuthRequest_1 = require("../../../internal/net/StitchAuthRequest");
var StitchRequestError_1 = __importDefault(require("../../../StitchRequestError"));
var StitchRequestErrorCode_1 = require("../../../StitchRequestErrorCode");
var CoreAuthProviderClient_1 = __importDefault(require("../internal/CoreAuthProviderClient"));
var UserApiKey_1 = __importDefault(require("./models/UserApiKey"));
var UserApiKeyAuthProvider_1 = __importDefault(require("./UserApiKeyAuthProvider"));
var ApiKeyFields;
(function (ApiKeyFields) {
    ApiKeyFields["NAME"] = "name";
})(ApiKeyFields || (ApiKeyFields = {}));
var CoreUserApiKeyAuthProviderClient = (function (_super) {
    __extends(CoreUserApiKeyAuthProviderClient, _super);
    function CoreUserApiKeyAuthProviderClient(requestClient, authRoutes) {
        var _this = this;
        var baseRoute = authRoutes.baseAuthRoute + "/api_keys";
        var name = UserApiKeyAuthProvider_1.default.DEFAULT_NAME;
        _this = _super.call(this, name, requestClient, baseRoute) || this;
        return _this;
    }
    CoreUserApiKeyAuthProviderClient.prototype.createApiKey = function (name) {
        var _a;
        var reqBuilder = new StitchAuthDocRequest_1.StitchAuthDocRequest.Builder();
        reqBuilder
            .withMethod(Method_1.default.POST)
            .withPath(this.baseRoute)
            .withDocument((_a = {},
            _a[ApiKeyFields.NAME] = name,
            _a))
            .withRefreshToken();
        return this.requestClient
            .doAuthenticatedRequest(reqBuilder.build())
            .then(function (response) {
            return UserApiKey_1.default.readFromApi(response.body);
        })
            .catch(function (err) {
            throw StitchErrorUtils_1.wrapDecodingError(err);
        });
    };
    CoreUserApiKeyAuthProviderClient.prototype.fetchApiKey = function (keyId) {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder
            .withMethod(Method_1.default.GET)
            .withPath(this.getApiKeyRoute(keyId.toHexString()));
        reqBuilder.withRefreshToken();
        return this.requestClient
            .doAuthenticatedRequest(reqBuilder.build())
            .then(function (response) {
            return UserApiKey_1.default.readFromApi(response.body);
        })
            .catch(function (err) {
            throw StitchErrorUtils_1.wrapDecodingError(err);
        });
    };
    CoreUserApiKeyAuthProviderClient.prototype.fetchApiKeys = function () {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withMethod(Method_1.default.GET).withPath(this.baseRoute);
        reqBuilder.withRefreshToken();
        return this.requestClient
            .doAuthenticatedRequest(reqBuilder.build())
            .then(function (response) {
            var json = JSON.parse(response.body);
            if (Array.isArray(json)) {
                return json.map(function (value) { return UserApiKey_1.default.readFromApi(value); });
            }
            throw new StitchRequestError_1.default(new Error("unexpected non-array response from server"), StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
        })
            .catch(function (err) {
            throw StitchErrorUtils_1.wrapDecodingError(err);
        });
    };
    CoreUserApiKeyAuthProviderClient.prototype.deleteApiKey = function (keyId) {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder
            .withMethod(Method_1.default.DELETE)
            .withPath(this.getApiKeyRoute(keyId.toHexString()));
        reqBuilder.withRefreshToken();
        return this.requestClient
            .doAuthenticatedRequest(reqBuilder.build())
            .then(function () { });
    };
    CoreUserApiKeyAuthProviderClient.prototype.enableApiKey = function (keyId) {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder
            .withMethod(Method_1.default.PUT)
            .withPath(this.getApiKeyEnableRoute(keyId.toHexString()));
        reqBuilder.withRefreshToken();
        return this.requestClient
            .doAuthenticatedRequest(reqBuilder.build())
            .then(function () { });
    };
    CoreUserApiKeyAuthProviderClient.prototype.disableApiKey = function (keyId) {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder
            .withMethod(Method_1.default.PUT)
            .withPath(this.getApiKeyDisableRoute(keyId.toHexString()));
        reqBuilder.withRefreshToken();
        return this.requestClient
            .doAuthenticatedRequest(reqBuilder.build())
            .then(function () { });
    };
    CoreUserApiKeyAuthProviderClient.prototype.getApiKeyRoute = function (keyId) {
        return this.baseRoute + "/" + keyId;
    };
    CoreUserApiKeyAuthProviderClient.prototype.getApiKeyEnableRoute = function (keyId) {
        return this.getApiKeyRoute(keyId) + "/enable";
    };
    CoreUserApiKeyAuthProviderClient.prototype.getApiKeyDisableRoute = function (keyId) {
        return this.getApiKeyRoute(keyId) + "/disable";
    };
    return CoreUserApiKeyAuthProviderClient;
}(CoreAuthProviderClient_1.default));
exports.default = CoreUserApiKeyAuthProviderClient;
//# sourceMappingURL=CoreUserApiKeyAuthProviderClient.js.map