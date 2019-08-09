import ProviderCapabilities from "../../ProviderCapabilities";
import ServerApiKeyAuthProvider from "./ServerApiKeyAuthProvider";
var Fields;
(function (Fields) {
    Fields["KEY"] = "key";
})(Fields || (Fields = {}));
var ServerApiKeyCredential = (function () {
    function ServerApiKeyCredential(key, providerName) {
        var _a;
        if (providerName === void 0) { providerName = ServerApiKeyAuthProvider.DEFAULT_NAME; }
        this.providerType = ServerApiKeyAuthProvider.TYPE;
        this.providerCapabilities = new ProviderCapabilities(false);
        this.providerName = providerName;
        this.key = key;
        this.material = (_a = {}, _a[Fields.KEY] = this.key, _a);
    }
    return ServerApiKeyCredential;
}());
export default ServerApiKeyCredential;
//# sourceMappingURL=ServerApiKeyCredential.js.map