"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var JWT_1 = __importDefault(require("./JWT"));
var SLEEP_MILLIS = 60000;
var EXPIRATION_WINDOW_SECS = 300;
var AccessTokenRefresher = (function () {
    function AccessTokenRefresher(auth) {
        this.auth = auth;
    }
    AccessTokenRefresher.prototype.shouldRefresh = function () {
        var auth = this.auth;
        if (auth === undefined) {
            return false;
        }
        if (!auth.isLoggedIn) {
            return false;
        }
        var info = auth.authInfo;
        if (info === undefined) {
            return false;
        }
        if (!info.isLoggedIn) {
            return false;
        }
        var jwt;
        try {
            jwt = JWT_1.default.fromEncoded(info.accessToken);
        }
        catch (e) {
            console.log(e);
            return false;
        }
        if (Date.now() / 1000 < jwt.expires - EXPIRATION_WINDOW_SECS) {
            return false;
        }
        return true;
    };
    AccessTokenRefresher.prototype.run = function () {
        var _this = this;
        if (!this.shouldRefresh()) {
            this.nextTimeout = setTimeout(function () { return _this.run(); }, SLEEP_MILLIS);
        }
        else {
            this.auth.refreshAccessToken().then(function () {
                _this.nextTimeout = setTimeout(function () { return _this.run(); }, SLEEP_MILLIS);
            }).catch(function () {
                _this.nextTimeout = setTimeout(function () { return _this.run(); }, SLEEP_MILLIS);
            });
        }
    };
    AccessTokenRefresher.prototype.stop = function () {
        clearTimeout(this.nextTimeout);
    };
    return AccessTokenRefresher;
}());
exports.default = AccessTokenRefresher;
//# sourceMappingURL=AccessTokenRefresher.js.map