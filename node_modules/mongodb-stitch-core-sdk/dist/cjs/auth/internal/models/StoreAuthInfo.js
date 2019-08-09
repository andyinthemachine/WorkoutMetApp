"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StitchClientError_1 = __importDefault(require("../../../StitchClientError"));
var StitchClientErrorCode_1 = require("../../../StitchClientErrorCode");
var AuthInfo_1 = __importDefault(require("../AuthInfo"));
var StoreCoreUserProfile_1 = __importDefault(require("./StoreCoreUserProfile"));
var StoreStitchUserIdentity_1 = __importDefault(require("./StoreStitchUserIdentity"));
var Fields;
(function (Fields) {
    Fields["USER_ID"] = "user_id";
    Fields["DEVICE_ID"] = "device_id";
    Fields["ACCESS_TOKEN"] = "access_token";
    Fields["REFRESH_TOKEN"] = "refresh_token";
    Fields["LAST_AUTH_ACTIVITY"] = "last_auth_activity";
    Fields["LOGGED_IN_PROVIDER_TYPE"] = "logged_in_provider_type";
    Fields["LOGGED_IN_PROVIDER_NAME"] = "logged_in_provider_name";
    Fields["USER_PROFILE"] = "user_profile";
})(Fields || (Fields = {}));
function readActiveUserFromStorage(storage) {
    var rawInfo = storage.get(StoreAuthInfo.ACTIVE_USER_STORAGE_NAME);
    if (!rawInfo) {
        return undefined;
    }
    return StoreAuthInfo.decode(JSON.parse(rawInfo));
}
exports.readActiveUserFromStorage = readActiveUserFromStorage;
function readCurrentUsersFromStorage(storage) {
    var rawInfo = storage.get(StoreAuthInfo.ALL_USERS_STORAGE_NAME);
    if (!rawInfo) {
        return new Map();
    }
    var rawArray = JSON.parse(rawInfo);
    if (!Array.isArray(rawArray)) {
        throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo);
    }
    var userIdToAuthInfoMap = new Map();
    rawArray.forEach(function (rawEntry) {
        var authInfo = StoreAuthInfo.decode(rawEntry);
        userIdToAuthInfoMap.set(authInfo.userId, authInfo);
    });
    return userIdToAuthInfoMap;
}
exports.readCurrentUsersFromStorage = readCurrentUsersFromStorage;
function writeActiveUserAuthInfoToStorage(authInfo, storage) {
    if (authInfo.isEmpty) {
        storage.remove(StoreAuthInfo.ACTIVE_USER_STORAGE_NAME);
        return;
    }
    var info = new StoreAuthInfo(authInfo.userId, authInfo.deviceId, authInfo.accessToken, authInfo.refreshToken, authInfo.loggedInProviderType, authInfo.loggedInProviderName, authInfo.lastAuthActivity, authInfo.userProfile
        ? new StoreCoreUserProfile_1.default(authInfo.userProfile.userType, authInfo.userProfile.data, authInfo.userProfile.identities.map(function (identity) {
            return new StoreStitchUserIdentity_1.default(identity.id, identity.providerType);
        }))
        : undefined);
    storage.set(StoreAuthInfo.ACTIVE_USER_STORAGE_NAME, JSON.stringify(info.encode()));
}
exports.writeActiveUserAuthInfoToStorage = writeActiveUserAuthInfoToStorage;
function writeAllUsersAuthInfoToStorage(currentUsersAuthInfo, storage) {
    var encodedStoreInfos = [];
    currentUsersAuthInfo.forEach(function (authInfo, userId) {
        var storeInfo = new StoreAuthInfo(userId, authInfo.deviceId, authInfo.accessToken, authInfo.refreshToken, authInfo.loggedInProviderType, authInfo.loggedInProviderName, authInfo.lastAuthActivity, authInfo.userProfile
            ? new StoreCoreUserProfile_1.default(authInfo.userProfile.userType, authInfo.userProfile.data, authInfo.userProfile.identities.map(function (identity) {
                return new StoreStitchUserIdentity_1.default(identity.id, identity.providerType);
            }))
            : undefined);
        encodedStoreInfos.push(storeInfo.encode());
    });
    storage.set(StoreAuthInfo.ALL_USERS_STORAGE_NAME, JSON.stringify(encodedStoreInfos));
}
exports.writeAllUsersAuthInfoToStorage = writeAllUsersAuthInfoToStorage;
var StoreAuthInfo = (function (_super) {
    __extends(StoreAuthInfo, _super);
    function StoreAuthInfo(userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, lastAuthActivity, userProfile) {
        var _this = _super.call(this, userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, lastAuthActivity, userProfile) || this;
        _this.userProfile = userProfile;
        return _this;
    }
    StoreAuthInfo.decode = function (from) {
        var userId = from[Fields.USER_ID];
        var deviceId = from[Fields.DEVICE_ID];
        var accessToken = from[Fields.ACCESS_TOKEN];
        var refreshToken = from[Fields.REFRESH_TOKEN];
        var loggedInProviderType = from[Fields.LOGGED_IN_PROVIDER_TYPE];
        var loggedInProviderName = from[Fields.LOGGED_IN_PROVIDER_NAME];
        var userProfile = from[Fields.USER_PROFILE];
        var lastAuthActivityMillisSinceEpoch = from[Fields.LAST_AUTH_ACTIVITY];
        return new StoreAuthInfo(userId, deviceId, accessToken, refreshToken, loggedInProviderType, loggedInProviderName, new Date(lastAuthActivityMillisSinceEpoch), StoreCoreUserProfile_1.default.decode(userProfile));
    };
    StoreAuthInfo.prototype.encode = function () {
        var to = {};
        to[Fields.USER_ID] = this.userId;
        to[Fields.ACCESS_TOKEN] = this.accessToken;
        to[Fields.REFRESH_TOKEN] = this.refreshToken;
        to[Fields.DEVICE_ID] = this.deviceId;
        to[Fields.LOGGED_IN_PROVIDER_NAME] = this.loggedInProviderName;
        to[Fields.LOGGED_IN_PROVIDER_TYPE] = this.loggedInProviderType;
        to[Fields.LAST_AUTH_ACTIVITY] = this.lastAuthActivity
            ? this.lastAuthActivity.getTime()
            : undefined;
        to[Fields.USER_PROFILE] = this.userProfile
            ? this.userProfile.encode()
            : undefined;
        return to;
    };
    StoreAuthInfo.ACTIVE_USER_STORAGE_NAME = "auth_info";
    StoreAuthInfo.ALL_USERS_STORAGE_NAME = "all_auth_infos";
    return StoreAuthInfo;
}(AuthInfo_1.default));
exports.StoreAuthInfo = StoreAuthInfo;
//# sourceMappingURL=StoreAuthInfo.js.map