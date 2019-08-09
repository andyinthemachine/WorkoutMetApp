import ProviderCapabilities from "../../ProviderCapabilities";
import AnonymousAuthProvider from "./AnonymousAuthProvider";
var AnonymousCredential = (function () {
    function AnonymousCredential(providerName) {
        if (providerName === void 0) { providerName = AnonymousAuthProvider.DEFAULT_NAME; }
        this.providerType = AnonymousAuthProvider.TYPE;
        this.material = {};
        this.providerCapabilities = new ProviderCapabilities(true);
        this.providerName = providerName;
    }
    return AnonymousCredential;
}());
export default AnonymousCredential;
//# sourceMappingURL=AnonymousCredential.js.map