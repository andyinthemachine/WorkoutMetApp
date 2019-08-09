import ProviderCapabilities from "../../ProviderCapabilities";
import CustomAuthProvider from "./CustomAuthProvider";
var Fields;
(function (Fields) {
    Fields["TOKEN"] = "token";
})(Fields || (Fields = {}));
var CustomCredential = (function () {
    function CustomCredential(token, providerName) {
        var _a;
        if (providerName === void 0) { providerName = CustomAuthProvider.DEFAULT_NAME; }
        this.providerType = CustomAuthProvider.TYPE;
        this.providerCapabilities = new ProviderCapabilities(false);
        this.providerName = providerName;
        this.token = token;
        this.material = (_a = {}, _a[Fields.TOKEN] = this.token, _a);
    }
    return CustomCredential;
}());
export default CustomCredential;
//# sourceMappingURL=CustomCredential.js.map