import ProviderCapabilities from "../../ProviderCapabilities";
import UserApiKeyAuthProvider from "./UserApiKeyAuthProvider";
var Fields;
(function (Fields) {
    Fields["KEY"] = "key";
})(Fields || (Fields = {}));
var UserApiKeyCredential = (function () {
    function UserApiKeyCredential(key, providerName) {
        var _a;
        if (providerName === void 0) { providerName = UserApiKeyAuthProvider.DEFAULT_NAME; }
        this.providerType = UserApiKeyAuthProvider.TYPE;
        this.providerCapabilities = new ProviderCapabilities(false);
        this.providerName = providerName;
        this.key = key;
        this.material = (_a = {},
            _a[Fields.KEY] = this.key,
            _a);
    }
    return UserApiKeyCredential;
}());
export default UserApiKeyCredential;
//# sourceMappingURL=UserApiKeyCredential.js.map