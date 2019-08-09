"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var StitchClientErrorCode;
(function (StitchClientErrorCode) {
    StitchClientErrorCode[StitchClientErrorCode["LoggedOutDuringRequest"] = 0] = "LoggedOutDuringRequest";
    StitchClientErrorCode[StitchClientErrorCode["MustAuthenticateFirst"] = 1] = "MustAuthenticateFirst";
    StitchClientErrorCode[StitchClientErrorCode["UserNoLongerValid"] = 2] = "UserNoLongerValid";
    StitchClientErrorCode[StitchClientErrorCode["UserNotFound"] = 3] = "UserNotFound";
    StitchClientErrorCode[StitchClientErrorCode["UserNotLoggedIn"] = 4] = "UserNotLoggedIn";
    StitchClientErrorCode[StitchClientErrorCode["CouldNotLoadPersistedAuthInfo"] = 5] = "CouldNotLoadPersistedAuthInfo";
    StitchClientErrorCode[StitchClientErrorCode["CouldNotPersistAuthInfo"] = 6] = "CouldNotPersistAuthInfo";
    StitchClientErrorCode[StitchClientErrorCode["StreamingNotSupported"] = 7] = "StreamingNotSupported";
    StitchClientErrorCode[StitchClientErrorCode["StreamClosed"] = 8] = "StreamClosed";
    StitchClientErrorCode[StitchClientErrorCode["UnexpectedArguments"] = 9] = "UnexpectedArguments";
})(StitchClientErrorCode = exports.StitchClientErrorCode || (exports.StitchClientErrorCode = {}));
exports.clientErrorCodeDescs = (_a = {},
    _a[StitchClientErrorCode.LoggedOutDuringRequest] = "logged out while making a request to Stitch",
    _a[StitchClientErrorCode.MustAuthenticateFirst] = "method called requires being authenticated",
    _a[StitchClientErrorCode.UserNoLongerValid] = "user instance being accessed is no longer valid; please get a new user with auth.getUser()",
    _a[StitchClientErrorCode.UserNotFound] = "user not found in list of users",
    _a[StitchClientErrorCode.UserNotLoggedIn] = "cannot make the active user a logged out user; please use loginWithCredential() to switch to this user",
    _a[StitchClientErrorCode.CouldNotLoadPersistedAuthInfo] = "failed to load stored auth information for Stitch",
    _a[StitchClientErrorCode.CouldNotPersistAuthInfo] = "failed to save auth information for Stitch",
    _a[StitchClientErrorCode.StreamingNotSupported] = "streaming not supported in this SDK",
    _a[StitchClientErrorCode.StreamClosed] = "stream is closed",
    _a[StitchClientErrorCode.UnexpectedArguments] = "function does not accept arguments",
    _a);
//# sourceMappingURL=StitchClientErrorCode.js.map