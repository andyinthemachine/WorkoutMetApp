"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StitchUserImpl_1 = __importDefault(require("./StitchUserImpl"));
var StitchUserFactoryImpl = (function () {
    function StitchUserFactoryImpl(auth) {
        this.auth = auth;
    }
    StitchUserFactoryImpl.prototype.makeUser = function (id, loggedInProviderType, loggedInProviderName, isLoggedIn, lastAuthActivity, userProfile) {
        return new StitchUserImpl_1.default(id, loggedInProviderType, loggedInProviderName, isLoggedIn, lastAuthActivity, userProfile, this.auth);
    };
    return StitchUserFactoryImpl;
}());
exports.default = StitchUserFactoryImpl;
//# sourceMappingURL=StitchUserFactoryImpl.js.map