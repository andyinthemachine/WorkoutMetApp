import ProviderCapabilities from "../../ProviderCapabilities";
import GoogleAuthProvider from "./GoogleAuthProvider";
var Fields;
(function (Fields) {
    Fields["AUTH_CODE"] = "authCode";
})(Fields || (Fields = {}));
var GoogleCredential = (function () {
    function GoogleCredential(authCode, providerName) {
        var _a;
        if (providerName === void 0) { providerName = GoogleAuthProvider.DEFAULT_NAME; }
        this.providerType = GoogleAuthProvider.TYPE;
        this.providerCapabilities = new ProviderCapabilities(false);
        this.providerName = providerName;
        this.authCode = authCode;
        this.material = (_a = {}, _a[Fields.AUTH_CODE] = this.authCode, _a);
    }
    return GoogleCredential;
}());
export default GoogleCredential;
//# sourceMappingURL=GoogleCredential.js.map