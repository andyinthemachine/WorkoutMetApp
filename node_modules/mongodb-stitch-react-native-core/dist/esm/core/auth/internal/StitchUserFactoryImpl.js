import StitchUserImpl from "./StitchUserImpl";
var StitchUserFactoryImpl = (function () {
    function StitchUserFactoryImpl(auth) {
        this.auth = auth;
    }
    StitchUserFactoryImpl.prototype.makeUser = function (id, loggedInProviderType, loggedInProviderName, isLoggedIn, lastAuthActivity, userProfile) {
        return new StitchUserImpl(id, loggedInProviderType, loggedInProviderName, isLoggedIn, lastAuthActivity, userProfile, this.auth);
    };
    return StitchUserFactoryImpl;
}());
export default StitchUserFactoryImpl;
//# sourceMappingURL=StitchUserFactoryImpl.js.map