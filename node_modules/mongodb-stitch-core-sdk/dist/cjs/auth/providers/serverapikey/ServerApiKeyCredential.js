"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
var ServerApiKeyAuthProvider_1 = __importDefault(require("./ServerApiKeyAuthProvider"));
var Fields;
(function (Fields) {
    Fields["KEY"] = "key";
})(Fields || (Fields = {}));
var ServerApiKeyCredential = (function () {
    function ServerApiKeyCredential(key, providerName) {
        var _a;
        if (providerName === void 0) { providerName = ServerApiKeyAuthProvider_1.default.DEFAULT_NAME; }
        this.providerType = ServerApiKeyAuthProvider_1.default.TYPE;
        this.providerCapabilities = new ProviderCapabilities_1.default(false);
        this.providerName = providerName;
        this.key = key;
        this.material = (_a = {}, _a[Fields.KEY] = this.key, _a);
    }
    return ServerApiKeyCredential;
}());
exports.default = ServerApiKeyCredential;
//# sourceMappingURL=ServerApiKeyCredential.js.map