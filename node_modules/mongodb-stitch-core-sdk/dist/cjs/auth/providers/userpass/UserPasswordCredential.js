"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderCapabilities_1 = __importDefault(require("../../ProviderCapabilities"));
var UserPasswordAuthProvider_1 = __importDefault(require("./UserPasswordAuthProvider"));
var Fields;
(function (Fields) {
    Fields["USERNAME"] = "username";
    Fields["PASSWORD"] = "password";
})(Fields || (Fields = {}));
var UserPasswordCredential = (function () {
    function UserPasswordCredential(username, password, providerName) {
        var _a;
        if (providerName === void 0) { providerName = UserPasswordAuthProvider_1.default.DEFAULT_NAME; }
        this.username = username;
        this.password = password;
        this.providerName = providerName;
        this.providerType = UserPasswordAuthProvider_1.default.TYPE;
        this.providerCapabilities = new ProviderCapabilities_1.default(false);
        this.material = (_a = {},
            _a[Fields.USERNAME] = this.username,
            _a[Fields.PASSWORD] = this.password,
            _a);
    }
    return UserPasswordCredential;
}());
exports.default = UserPasswordCredential;
//# sourceMappingURL=UserPasswordCredential.js.map