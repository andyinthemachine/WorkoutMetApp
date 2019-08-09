"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
var UserApiKeyAuthProvider_1 = __importDefault(require("./UserApiKeyAuthProvider"));
var Fields;
(function (Fields) {
    Fields["KEY"] = "key";
})(Fields || (Fields = {}));
var UserApiKeyCredential = (function () {
    function UserApiKeyCredential(key, providerName) {
        var _a;
        if (providerName === void 0) { providerName = UserApiKeyAuthProvider_1.default.DEFAULT_NAME; }
        this.providerType = UserApiKeyAuthProvider_1.default.TYPE;
        this.providerCapabilities = new ProviderCapabilities_1.default(false);
        this.providerName = providerName;
        this.key = key;
        this.material = (_a = {},
            _a[Fields.KEY] = this.key,
            _a);
    }
    return UserApiKeyCredential;
}());
exports.default = UserApiKeyCredential;
//# sourceMappingURL=UserApiKeyCredential.js.map