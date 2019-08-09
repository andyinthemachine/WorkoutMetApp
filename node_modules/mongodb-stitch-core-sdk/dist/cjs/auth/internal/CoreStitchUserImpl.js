"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StitchUserProfileImpl_1 = __importDefault(require("./StitchUserProfileImpl"));
var CoreStitchUserImpl = (function () {
    function CoreStitchUserImpl(id, loggedInProviderType, loggedInProviderName, isLoggedIn, lastAuthActivity, profile) {
        this.id = id;
        this.loggedInProviderType = loggedInProviderType;
        this.loggedInProviderName = loggedInProviderName;
        this.profile =
            profile === undefined ? StitchUserProfileImpl_1.default.empty() : profile;
        this.isLoggedIn = isLoggedIn;
        this.lastAuthActivity = lastAuthActivity;
    }
    Object.defineProperty(CoreStitchUserImpl.prototype, "userType", {
        get: function () {
            return this.profile.userType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStitchUserImpl.prototype, "identities", {
        get: function () {
            return this.profile.identities;
        },
        enumerable: true,
        configurable: true
    });
    CoreStitchUserImpl.prototype.equals = function (other) {
        return this.id === other.id
            && JSON.stringify(this.identities) === JSON.stringify(other.identities)
            && this.isLoggedIn === other.isLoggedIn
            && this.loggedInProviderName === other.loggedInProviderName
            && this.loggedInProviderType === other.loggedInProviderType
            && JSON.stringify(this.profile) === JSON.stringify(other.profile);
    };
    return CoreStitchUserImpl;
}());
exports.default = CoreStitchUserImpl;
//# sourceMappingURL=CoreStitchUserImpl.js.map