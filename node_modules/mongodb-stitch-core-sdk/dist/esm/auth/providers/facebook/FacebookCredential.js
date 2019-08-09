import ProviderCapabilities from "../../ProviderCapabilities";
import FacebookAuthProvider from "./FacebookAuthProvider";
var Fields;
(function (Fields) {
    Fields["ACCESS_TOKEN"] = "accessToken";
})(Fields || (Fields = {}));
var FacebookCredential = (function () {
    function FacebookCredential(accessToken, providerName) {
        var _a;
        if (providerName === void 0) { providerName = FacebookAuthProvider.DEFAULT_NAME; }
        this.providerType = FacebookAuthProvider.TYPE;
        this.providerName = providerName;
        this.accessToken = accessToken;
        this.material = (_a = {}, _a[Fields.ACCESS_TOKEN] = this.accessToken, _a);
    }
    Object.defineProperty(FacebookCredential.prototype, "providerCapabilities", {
        get: function () {
            return new ProviderCapabilities(false);
        },
        enumerable: true,
        configurable: true
    });
    return FacebookCredential;
}());
export default FacebookCredential;
//# sourceMappingURL=FacebookCredential.js.map