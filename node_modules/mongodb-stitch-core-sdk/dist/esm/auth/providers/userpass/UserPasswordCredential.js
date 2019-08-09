import ProviderCapabilities from "../../ProviderCapabilities";
import UserPasswordAuthProvider from "./UserPasswordAuthProvider";
var Fields;
(function (Fields) {
    Fields["USERNAME"] = "username";
    Fields["PASSWORD"] = "password";
})(Fields || (Fields = {}));
var UserPasswordCredential = (function () {
    function UserPasswordCredential(username, password, providerName) {
        var _a;
        if (providerName === void 0) { providerName = UserPasswordAuthProvider.DEFAULT_NAME; }
        this.username = username;
        this.password = password;
        this.providerName = providerName;
        this.providerType = UserPasswordAuthProvider.TYPE;
        this.providerCapabilities = new ProviderCapabilities(false);
        this.material = (_a = {},
            _a[Fields.USERNAME] = this.username,
            _a[Fields.PASSWORD] = this.password,
            _a);
    }
    return UserPasswordCredential;
}());
export default UserPasswordCredential;
//# sourceMappingURL=UserPasswordCredential.js.map