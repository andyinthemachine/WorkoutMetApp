"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
var GoogleAuthProvider_1 = __importDefault(require("./GoogleAuthProvider"));
var Fields;
(function (Fields) {
    Fields["AUTH_CODE"] = "authCode";
})(Fields || (Fields = {}));
var GoogleCredential = (function () {
    function GoogleCredential(authCode, providerName) {
        var _a;
        if (providerName === void 0) { providerName = GoogleAuthProvider_1.default.DEFAULT_NAME; }
        this.providerType = GoogleAuthProvider_1.default.TYPE;
        this.providerCapabilities = new ProviderCapabilities_1.default(false);
        this.providerName = providerName;
        this.authCode = authCode;
        this.material = (_a = {}, _a[Fields.AUTH_CODE] = this.authCode, _a);
    }
    return GoogleCredential;
}());
exports.default = GoogleCredential;
//# sourceMappingURL=GoogleCredential.js.map