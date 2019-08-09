"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
var AnonymousAuthProvider_1 = __importDefault(require("./AnonymousAuthProvider"));
var AnonymousCredential = (function () {
    function AnonymousCredential(providerName) {
        if (providerName === void 0) { providerName = AnonymousAuthProvider_1.default.DEFAULT_NAME; }
        this.providerType = AnonymousAuthProvider_1.default.TYPE;
        this.material = {};
        this.providerCapabilities = new ProviderCapabilities_1.default(true);
        this.providerName = providerName;
    }
    return AnonymousCredential;
}());
exports.default = AnonymousCredential;
//# sourceMappingURL=AnonymousCredential.js.map