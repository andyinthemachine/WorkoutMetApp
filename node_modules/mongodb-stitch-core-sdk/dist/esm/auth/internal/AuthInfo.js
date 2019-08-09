var AuthInfo = (function () {
    function AuthInfo(userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, lastAuthActivity, userProfile) {
        this.userId = userId;
        this.deviceId = deviceId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.loggedInProviderType = loggedInProviderType;
        this.loggedInProviderName = loggedInProviderName;
        this.lastAuthActivity = lastAuthActivity;
        this.userProfile = userProfile;
    }
    AuthInfo.empty = function () {
        return new AuthInfo(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    };
    Object.defineProperty(AuthInfo.prototype, "hasUser", {
        get: function () {
            return this.userId !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthInfo.prototype, "isEmpty", {
        get: function () {
            return this.deviceId === undefined;
        },
        enumerable: true,
        configurable: true
    });
    AuthInfo.prototype.loggedOut = function () {
        return new AuthInfo(this.userId, this.deviceId, undefined, undefined, this.loggedInProviderType, this.loggedInProviderName, new Date(), this.userProfile);
    };
    AuthInfo.prototype.withClearedUser = function () {
        return new AuthInfo(undefined, this.deviceId, undefined, undefined, undefined, undefined, undefined, undefined);
    };
    AuthInfo.prototype.withAuthProvider = function (providerType, providerName) {
        return new AuthInfo(this.userId, this.deviceId, this.accessToken, this.refreshToken, providerType, providerName, new Date(), this.userProfile);
    };
    AuthInfo.prototype.withNewAuthActivityTime = function () {
        return new AuthInfo(this.userId, this.deviceId, this.accessToken, this.refreshToken, this.loggedInProviderType, this.loggedInProviderName, new Date(), this.userProfile);
    };
    Object.defineProperty(AuthInfo.prototype, "isLoggedIn", {
        get: function () {
            return this.accessToken !== undefined && this.refreshToken !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    AuthInfo.prototype.merge = function (newInfo) {
        return new AuthInfo(newInfo.userId === undefined ? this.userId : newInfo.userId, newInfo.deviceId === undefined ? this.deviceId : newInfo.deviceId, newInfo.accessToken === undefined
            ? this.accessToken
            : newInfo.accessToken, newInfo.refreshToken === undefined
            ? this.refreshToken
            : newInfo.refreshToken, newInfo.loggedInProviderType === undefined
            ? this.loggedInProviderType
            : newInfo.loggedInProviderType, newInfo.loggedInProviderName === undefined
            ? this.loggedInProviderName
            : newInfo.loggedInProviderName, newInfo.lastAuthActivity === undefined
            ? this.lastAuthActivity
            : newInfo.lastAuthActivity, newInfo.userProfile === undefined
            ? this.userProfile
            : newInfo.userProfile);
    };
    return AuthInfo;
}());
export default AuthInfo;
//# sourceMappingURL=AuthInfo.js.map