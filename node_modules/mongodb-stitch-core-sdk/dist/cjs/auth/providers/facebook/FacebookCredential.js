"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
var FacebookAuthProvider_1 = __importDefault(require("./FacebookAuthProvider"));
var Fields;
(function (Fields) {
    Fields["ACCESS_TOKEN"] = "accessToken";
})(Fields || (Fields = {}));
var FacebookCredential = (function () {
    function FacebookCredential(accessToken, providerName) {
        var _a;
        if (providerName === void 0) { providerName = FacebookAuthProvider_1.default.DEFAULT_NAME; }
        this.providerType = FacebookAuthProvider_1.default.TYPE;
        this.providerName = providerName;
        this.accessToken = accessToken;
        this.material = (_a = {}, _a[Fields.ACCESS_TOKEN] = this.accessToken, _a);
    }
    Object.defineProperty(FacebookCredential.prototype, "providerCapabilities", {
        get: function () {
            return new ProviderCapabilities_1.default(false);
        },
        enumerable: true,
        configurable: true
    });
    return FacebookCredential;
}());
exports.default = FacebookCredential;
//# sourceMappingURL=FacebookCredential.js.map