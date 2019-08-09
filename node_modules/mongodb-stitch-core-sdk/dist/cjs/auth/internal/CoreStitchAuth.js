"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bson_1 = require("bson");
var StitchErrorUtils_1 = require("../../internal/common/StitchErrorUtils");
var Headers_1 = __importDefault(require("../../internal/net/Headers"));
var Method_1 = __importDefault(require("../../internal/net/Method"));
var StitchAuthDocRequest_1 = require("../../internal/net/StitchAuthDocRequest");
var StitchAuthRequest_1 = require("../../internal/net/StitchAuthRequest");
var StitchDocRequest_1 = require("../../internal/net/StitchDocRequest");
var StitchClientError_1 = __importDefault(require("../../StitchClientError"));
var StitchClientErrorCode_1 = require("../../StitchClientErrorCode");
var StitchError_1 = __importDefault(require("../../StitchError"));
var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));
var StitchRequestErrorCode_1 = require("../../StitchRequestErrorCode");
var StitchServiceError_1 = __importDefault(require("../../StitchServiceError"));
var StitchServiceErrorCode_1 = require("../../StitchServiceErrorCode");
var Stream_1 = __importDefault(require("../../Stream"));
var AnonymousAuthProvider_1 = __importDefault(require("../providers/anonymous/AnonymousAuthProvider"));
var StitchAuthResponseCredential_1 = __importDefault(require("../providers/internal/StitchAuthResponseCredential"));
var AccessTokenRefresher_1 = __importDefault(require("./AccessTokenRefresher"));
var AuthEvent_1 = require("./AuthEvent");
var AuthInfo_1 = __importDefault(require("./AuthInfo"));
var JWT_1 = __importDefault(require("./JWT"));
var ApiAuthInfo_1 = __importDefault(require("./models/ApiAuthInfo"));
var ApiCoreUserProfile_1 = __importDefault(require("./models/ApiCoreUserProfile"));
var StoreAuthInfo_1 = require("./models/StoreAuthInfo");
var OPTIONS = "options";
var DEVICE = "device";
var CoreStitchAuth = (function () {
    function CoreStitchAuth(requestClient, authRoutes, storage, useTokenRefresher) {
        if (useTokenRefresher === void 0) { useTokenRefresher = true; }
        this.requestClient = requestClient;
        this.authRoutes = authRoutes;
        this.storage = storage;
        var allUsersAuthInfo;
        try {
            allUsersAuthInfo = StoreAuthInfo_1.readCurrentUsersFromStorage(storage);
        }
        catch (e) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo);
        }
        this.allUsersAuthInfo = allUsersAuthInfo;
        var activeUserAuthInfo;
        try {
            activeUserAuthInfo = StoreAuthInfo_1.readActiveUserFromStorage(storage);
        }
        catch (e) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo);
        }
        this.activeUserAuthInfo =
            activeUserAuthInfo === undefined ? AuthInfo_1.default.empty() : activeUserAuthInfo;
        if (this.activeUserAuthInfo.hasUser) {
            this.currentUser = this.prepUser(this.activeUserAuthInfo);
        }
        if (useTokenRefresher) {
            this.accessTokenRefresher = new AccessTokenRefresher_1.default(this);
            this.accessTokenRefresher.run();
        }
    }
    Object.defineProperty(CoreStitchAuth.prototype, "authInfo", {
        get: function () {
            return this.activeUserAuthInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStitchAuth.prototype, "isLoggedIn", {
        get: function () {
            return this.currentUser !== undefined && this.currentUser.isLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStitchAuth.prototype, "user", {
        get: function () {
            return this.currentUser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStitchAuth.prototype, "hasDeviceId", {
        get: function () {
            return (this.activeUserAuthInfo.deviceId !== undefined &&
                this.activeUserAuthInfo.deviceId !== "" &&
                this.activeUserAuthInfo.deviceId !== "000000000000000000000000");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreStitchAuth.prototype, "deviceId", {
        get: function () {
            if (!this.hasDeviceId) {
                return undefined;
            }
            return this.activeUserAuthInfo.deviceId;
        },
        enumerable: true,
        configurable: true
    });
    CoreStitchAuth.prototype.listUsers = function () {
        var _this = this;
        var list = [];
        this.allUsersAuthInfo.forEach(function (authInfo) {
            list.push(_this.prepUser(authInfo));
        });
        return list;
    };
    CoreStitchAuth.prototype.doAuthenticatedRequest = function (stitchReq, authInfo) {
        var _this = this;
        try {
            return this.requestClient
                .doRequest(this.prepareAuthRequest(stitchReq, authInfo || this.activeUserAuthInfo))
                .catch(function (err) {
                return _this.handleAuthFailure(err, stitchReq);
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    CoreStitchAuth.prototype.doAuthenticatedRequestWithDecoder = function (stitchReq, decoder) {
        return this.doAuthenticatedRequest(stitchReq)
            .then(function (response) {
            var obj = bson_1.EJSON.parse(response.body, { strict: false });
            if (decoder) {
                return decoder.decode(obj);
            }
            return obj;
        })
            .catch(function (err) {
            throw StitchErrorUtils_1.wrapDecodingError(err);
        });
    };
    CoreStitchAuth.prototype.openAuthenticatedEventStream = function (stitchReq, open) {
        var _this = this;
        if (open === void 0) { open = true; }
        if (!this.isLoggedIn) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.MustAuthenticateFirst);
        }
        var authToken = stitchReq.useRefreshToken ?
            this.activeUserAuthInfo.refreshToken : this.activeUserAuthInfo.accessToken;
        return this.requestClient.doStreamRequest(stitchReq.builder
            .withPath(stitchReq.path + "&stitch_at=" + authToken)
            .build(), open, function () { return _this.openAuthenticatedEventStream(stitchReq, false); })
            .catch(function (err) {
            return _this.handleAuthFailureForEventStream(err, stitchReq, open);
        });
    };
    CoreStitchAuth.prototype.openAuthenticatedStreamWithDecoder = function (stitchReq, decoder) {
        return this.openAuthenticatedEventStream(stitchReq)
            .then(function (eventStream) {
            return new Stream_1.default(eventStream, decoder);
        });
    };
    CoreStitchAuth.prototype.refreshAccessToken = function () {
        var _this = this;
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder()
            .withRefreshToken()
            .withPath(this.authRoutes.sessionRoute)
            .withMethod(Method_1.default.POST);
        return this.doAuthenticatedRequest(reqBuilder.build()).then(function (response) {
            try {
                var partialInfo = ApiAuthInfo_1.default.fromJSON(JSON.parse(response.body));
                _this.activeUserAuthInfo = _this.activeUserAuthInfo.merge(partialInfo);
            }
            catch (err) {
                throw new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
            }
            try {
                StoreAuthInfo_1.writeActiveUserAuthInfoToStorage(_this.activeUserAuthInfo, _this.storage);
                _this.allUsersAuthInfo.set(_this.activeUserAuthInfo.userId, _this.activeUserAuthInfo);
                StoreAuthInfo_1.writeAllUsersAuthInfoToStorage(_this.allUsersAuthInfo, _this.storage);
            }
            catch (err) {
                throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotPersistAuthInfo);
            }
        });
    };
    CoreStitchAuth.prototype.switchToUserWithId = function (userId) {
        var authInfo = this.allUsersAuthInfo.get(userId);
        if (authInfo === undefined) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.UserNotFound);
        }
        if (!authInfo.isLoggedIn) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.UserNotLoggedIn);
        }
        if (this.activeUserAuthInfo.hasUser) {
            this.allUsersAuthInfo.set(this.activeUserAuthInfo.userId, this.activeUserAuthInfo.withNewAuthActivityTime());
        }
        var newAuthInfo = authInfo.withNewAuthActivityTime();
        this.allUsersAuthInfo.set(userId, newAuthInfo);
        StoreAuthInfo_1.writeActiveUserAuthInfoToStorage(newAuthInfo, this.storage);
        this.activeUserAuthInfo = newAuthInfo;
        var previousUser = this.currentUser;
        this.currentUser = this.prepUser(newAuthInfo);
        this.onAuthEvent();
        this.dispatchAuthEvent({
            currentActiveUser: this.currentUser,
            kind: AuthEvent_1.AuthEventKind.ActiveUserChanged,
            previousActiveUser: previousUser
        });
        return this.currentUser;
    };
    CoreStitchAuth.prototype.loginWithCredentialInternal = function (credential) {
        var _this = this;
        var e_1, _a;
        if (credential instanceof StitchAuthResponseCredential_1.default) {
            return this.processLogin(credential, credential.authInfo, credential.asLink).then(function (user) {
                _this.dispatchAuthEvent({
                    kind: AuthEvent_1.AuthEventKind.UserLoggedIn,
                    loggedInUser: user
                });
                return user;
            });
        }
        if (credential.providerCapabilities.reusesExistingSession) {
            try {
                for (var _b = __values(this.allUsersAuthInfo), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), userId = _d[0], authInfo = _d[1];
                    if (authInfo.loggedInProviderType === credential.providerType) {
                        if (authInfo.isLoggedIn) {
                            try {
                                return Promise.resolve(this.switchToUserWithId(userId));
                            }
                            catch (error) {
                                return Promise.reject(error);
                            }
                        }
                        if (authInfo.userId !== undefined) {
                            this.removeUserWithIdInternal(authInfo.userId);
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return this.doLogin(credential, false);
    };
    CoreStitchAuth.prototype.linkUserWithCredentialInternal = function (user, credential) {
        if (this.currentUser !== undefined && user.id !== this.currentUser.id) {
            return Promise.reject(new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.UserNoLongerValid));
        }
        return this.doLogin(credential, true);
    };
    CoreStitchAuth.prototype.logoutInternal = function () {
        if (!this.isLoggedIn || !this.currentUser) {
            return Promise.resolve();
        }
        return this.logoutUserWithIdInternal(this.currentUser.id);
    };
    CoreStitchAuth.prototype.logoutUserWithIdInternal = function (userId) {
        var _this = this;
        var authInfo = this.allUsersAuthInfo.get(userId);
        if (authInfo === undefined) {
            return Promise.reject(new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.UserNotFound));
        }
        if (!authInfo.isLoggedIn) {
            return Promise.resolve();
        }
        var clearAuthBlock = function () {
            _this.clearUserAuthTokens(authInfo.userId);
            if (authInfo.loggedInProviderType === AnonymousAuthProvider_1.default.TYPE) {
                _this.removeUserWithIdInternal(authInfo.userId);
            }
        };
        return this.doLogout(authInfo)
            .then(function () {
            clearAuthBlock();
        })
            .catch(function () {
            clearAuthBlock();
        });
    };
    CoreStitchAuth.prototype.removeUserInternal = function () {
        if (!this.isLoggedIn || this.currentUser === undefined) {
            return Promise.resolve();
        }
        return this.removeUserWithIdInternal(this.currentUser.id);
    };
    CoreStitchAuth.prototype.removeUserWithIdInternal = function (userId) {
        var _this = this;
        var authInfo = this.allUsersAuthInfo.get(userId);
        if (authInfo === undefined) {
            return Promise.reject(new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.UserNotFound));
        }
        var removeBlock = function () {
            _this.clearUserAuthTokens(authInfo.userId);
            _this.allUsersAuthInfo.delete(userId);
            StoreAuthInfo_1.writeAllUsersAuthInfoToStorage(_this.allUsersAuthInfo, _this.storage);
            var removedUser = _this.prepUser(authInfo.loggedOut());
            _this.onAuthEvent();
            _this.dispatchAuthEvent({
                kind: AuthEvent_1.AuthEventKind.UserRemoved,
                removedUser: removedUser
            });
        };
        if (authInfo.isLoggedIn) {
            return this.doLogout(authInfo).then(function () {
                removeBlock();
            }).catch(function (err) {
                removeBlock();
            });
        }
        removeBlock();
        return Promise.resolve();
    };
    CoreStitchAuth.prototype.close = function () {
        if (this.accessTokenRefresher) {
            this.accessTokenRefresher.stop();
        }
    };
    CoreStitchAuth.prototype.prepareAuthRequest = function (stitchReq, authInfo) {
        if (!authInfo.isLoggedIn) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.MustAuthenticateFirst);
        }
        var newReq = stitchReq.builder;
        var newHeaders = newReq.headers || {};
        if (stitchReq.useRefreshToken) {
            newHeaders[Headers_1.default.AUTHORIZATION] = Headers_1.default.getAuthorizationBearer(authInfo.refreshToken);
        }
        else {
            newHeaders[Headers_1.default.AUTHORIZATION] = Headers_1.default.getAuthorizationBearer(authInfo.accessToken);
        }
        newReq.withHeaders(newHeaders);
        return newReq.build();
    };
    CoreStitchAuth.prototype.handleAuthFailureForEventStream = function (ex, req, open) {
        var _this = this;
        if (open === void 0) { open = true; }
        if (!(ex instanceof StitchServiceError_1.default) ||
            ex.errorCode !== StitchServiceErrorCode_1.StitchServiceErrorCode.InvalidSession) {
            throw ex;
        }
        if (req.useRefreshToken || !req.shouldRefreshOnFailure) {
            this.clearActiveUserAuth();
            throw ex;
        }
        return this.tryRefreshAccessToken(req.startedAt).then(function () {
            return _this.openAuthenticatedEventStream(req.builder.withShouldRefreshOnFailure(false).build(), open);
        });
    };
    CoreStitchAuth.prototype.handleAuthFailure = function (ex, req) {
        var _this = this;
        if (!(ex instanceof StitchServiceError_1.default) ||
            ex.errorCode !== StitchServiceErrorCode_1.StitchServiceErrorCode.InvalidSession) {
            throw ex;
        }
        if (req.useRefreshToken || !req.shouldRefreshOnFailure) {
            this.clearActiveUserAuth();
            throw ex;
        }
        return this.tryRefreshAccessToken(req.startedAt).then(function () {
            return _this.doAuthenticatedRequest(req.builder.withShouldRefreshOnFailure(false).build());
        });
    };
    CoreStitchAuth.prototype.tryRefreshAccessToken = function (reqStartedAt) {
        if (!this.isLoggedIn) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.LoggedOutDuringRequest);
        }
        try {
            var jwt = JWT_1.default.fromEncoded(this.activeUserAuthInfo.accessToken);
            if (jwt.issuedAt >= reqStartedAt) {
                return Promise.resolve();
            }
        }
        catch (e) {
        }
        return this.refreshAccessToken();
    };
    CoreStitchAuth.prototype.prepUser = function (authInfo) {
        return this.userFactory.makeUser(authInfo.userId, authInfo.loggedInProviderType, authInfo.loggedInProviderName, authInfo.isLoggedIn, authInfo.lastAuthActivity, authInfo.userProfile);
    };
    CoreStitchAuth.prototype.attachAuthOptions = function (authBody) {
        var options = {};
        options[DEVICE] = this.deviceInfo;
        authBody[OPTIONS] = options;
    };
    CoreStitchAuth.prototype.doLogin = function (credential, asLinkRequest) {
        var _this = this;
        var previousActiveUser = this.currentUser;
        return this.doLoginRequest(credential, asLinkRequest)
            .then(function (response) { return _this.processLoginResponse(credential, response, asLinkRequest); })
            .then(function (user) {
            _this.onAuthEvent();
            if (asLinkRequest) {
                _this.dispatchAuthEvent({
                    kind: AuthEvent_1.AuthEventKind.UserLinked,
                    linkedUser: user
                });
            }
            else {
                _this.dispatchAuthEvent({
                    kind: AuthEvent_1.AuthEventKind.UserLoggedIn,
                    loggedInUser: user,
                });
                _this.dispatchAuthEvent({
                    currentActiveUser: user,
                    kind: AuthEvent_1.AuthEventKind.ActiveUserChanged,
                    previousActiveUser: previousActiveUser
                });
            }
            return user;
        });
    };
    CoreStitchAuth.prototype.doLoginRequest = function (credential, asLinkRequest) {
        var reqBuilder = new StitchDocRequest_1.StitchDocRequest.Builder();
        reqBuilder.withMethod(Method_1.default.POST);
        if (asLinkRequest) {
            reqBuilder.withPath(this.authRoutes.getAuthProviderLinkRoute(credential.providerName));
        }
        else {
            reqBuilder.withPath(this.authRoutes.getAuthProviderLoginRoute(credential.providerName));
        }
        var material = credential.material;
        this.attachAuthOptions(material);
        reqBuilder.withDocument(material);
        if (!asLinkRequest) {
            return this.requestClient.doRequest(reqBuilder.build());
        }
        var linkRequest = new StitchAuthDocRequest_1.StitchAuthDocRequest(reqBuilder.build(), reqBuilder.document);
        return this.doAuthenticatedRequest(linkRequest);
    };
    CoreStitchAuth.prototype.processLogin = function (credential, newAuthInfo, asLinkRequest) {
        var _this = this;
        var oldActiveUserInfo = this.activeUserAuthInfo;
        var oldActiveUser = this.currentUser;
        newAuthInfo = this.activeUserAuthInfo.merge(new AuthInfo_1.default(newAuthInfo.userId, newAuthInfo.deviceId, newAuthInfo.accessToken, newAuthInfo.refreshToken, credential.providerType, credential.providerName, undefined, undefined));
        this.activeUserAuthInfo = newAuthInfo;
        this.currentUser = this.userFactory.makeUser(this.activeUserAuthInfo.userId, credential.providerType, credential.providerName, this.activeUserAuthInfo.isLoggedIn, new Date(), undefined);
        return this.doGetUserProfile()
            .then(function (profile) {
            if (oldActiveUserInfo.hasUser) {
                _this.allUsersAuthInfo.set(oldActiveUserInfo.userId, oldActiveUserInfo.withNewAuthActivityTime());
            }
            newAuthInfo = newAuthInfo.merge(new AuthInfo_1.default(newAuthInfo.userId, newAuthInfo.deviceId, newAuthInfo.accessToken, newAuthInfo.refreshToken, credential.providerType, credential.providerName, new Date(), profile));
            var newUserAdded = !_this.allUsersAuthInfo.has(newAuthInfo.userId);
            try {
                StoreAuthInfo_1.writeActiveUserAuthInfoToStorage(newAuthInfo, _this.storage);
                _this.allUsersAuthInfo.set(newAuthInfo.userId, newAuthInfo);
                StoreAuthInfo_1.writeAllUsersAuthInfoToStorage(_this.allUsersAuthInfo, _this.storage);
            }
            catch (err) {
                _this.activeUserAuthInfo = oldActiveUserInfo;
                _this.currentUser = oldActiveUser;
                if (newAuthInfo.userId !== oldActiveUserInfo.userId && newAuthInfo.userId) {
                    _this.allUsersAuthInfo.delete(newAuthInfo.userId);
                }
                throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotPersistAuthInfo);
            }
            _this.activeUserAuthInfo = newAuthInfo;
            _this.currentUser = _this.userFactory.makeUser(_this.activeUserAuthInfo.userId, credential.providerType, credential.providerName, _this.activeUserAuthInfo.isLoggedIn, _this.activeUserAuthInfo.lastAuthActivity, profile);
            if (newUserAdded) {
                _this.onAuthEvent();
                _this.dispatchAuthEvent({
                    addedUser: _this.currentUser,
                    kind: AuthEvent_1.AuthEventKind.UserAdded
                });
            }
            return _this.currentUser;
        })
            .catch(function (err) {
            if (err instanceof StitchClientError_1.default) {
                throw err;
            }
            if (asLinkRequest || oldActiveUserInfo.hasUser) {
                var linkedAuthInfo = _this.activeUserAuthInfo;
                _this.activeUserAuthInfo = oldActiveUserInfo;
                _this.currentUser = oldActiveUser;
                if (asLinkRequest) {
                    _this.activeUserAuthInfo = _this.activeUserAuthInfo.withAuthProvider(linkedAuthInfo.loggedInProviderType, linkedAuthInfo.loggedInProviderName);
                }
            }
            else {
                _this.clearActiveUserAuth();
            }
            throw err;
        });
    };
    CoreStitchAuth.prototype.processLoginResponse = function (credential, response, asLinkRequest) {
        try {
            if (!response) {
                throw new StitchServiceError_1.default("the login response could not be processed for credential: " + credential + ";" +
                    "response was undefined");
            }
            if (!response.body) {
                throw new StitchServiceError_1.default("response with status code " + response.statusCode + " has empty body");
            }
            return this.processLogin(credential, ApiAuthInfo_1.default.fromJSON(JSON.parse(response.body)), asLinkRequest);
        }
        catch (err) {
            throw new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
        }
    };
    CoreStitchAuth.prototype.doGetUserProfile = function () {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder.withMethod(Method_1.default.GET).withPath(this.authRoutes.profileRoute);
        return this.doAuthenticatedRequest(reqBuilder.build())
            .then(function (response) { return ApiCoreUserProfile_1.default.fromJSON(JSON.parse(response.body)); })
            .catch(function (err) {
            if (err instanceof StitchError_1.default) {
                throw err;
            }
            else {
                throw new StitchRequestError_1.default(err, StitchRequestErrorCode_1.StitchRequestErrorCode.DECODING_ERROR);
            }
        });
    };
    CoreStitchAuth.prototype.doLogout = function (authInfo) {
        var reqBuilder = new StitchAuthRequest_1.StitchAuthRequest.Builder();
        reqBuilder
            .withRefreshToken()
            .withPath(this.authRoutes.sessionRoute)
            .withMethod(Method_1.default.DELETE);
        return this.doAuthenticatedRequest(reqBuilder.build(), authInfo).then(function () {
            return;
        });
    };
    CoreStitchAuth.prototype.clearActiveUserAuth = function () {
        if (!this.isLoggedIn) {
            return;
        }
        this.clearUserAuthTokens(this.activeUserAuthInfo.userId);
    };
    CoreStitchAuth.prototype.clearUserAuthTokens = function (userId) {
        var unclearedAuthInfo = this.allUsersAuthInfo.get(userId);
        if (unclearedAuthInfo === undefined) {
            if (this.activeUserAuthInfo.userId !== userId) {
                throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.UserNotFound);
            }
        }
        else if (!unclearedAuthInfo.isLoggedIn) {
            return;
        }
        try {
            var loggedOutUser = void 0;
            if (unclearedAuthInfo) {
                var loggedOutAuthInfo = unclearedAuthInfo.loggedOut();
                this.allUsersAuthInfo.set(userId, loggedOutAuthInfo);
                StoreAuthInfo_1.writeAllUsersAuthInfoToStorage(this.allUsersAuthInfo, this.storage);
                loggedOutUser = this.userFactory.makeUser(loggedOutAuthInfo.userId, loggedOutAuthInfo.loggedInProviderType, loggedOutAuthInfo.loggedInProviderName, loggedOutAuthInfo.isLoggedIn, loggedOutAuthInfo.lastAuthActivity, loggedOutAuthInfo.userProfile);
            }
            var wasActiveUser = false;
            if (this.activeUserAuthInfo.hasUser && this.activeUserAuthInfo.userId === userId) {
                wasActiveUser = true;
                this.activeUserAuthInfo = this.activeUserAuthInfo.withClearedUser();
                this.currentUser = undefined;
                StoreAuthInfo_1.writeActiveUserAuthInfoToStorage(this.activeUserAuthInfo, this.storage);
            }
            if (loggedOutUser) {
                this.onAuthEvent();
                this.dispatchAuthEvent({
                    kind: AuthEvent_1.AuthEventKind.UserLoggedOut,
                    loggedOutUser: loggedOutUser,
                });
                if (wasActiveUser) {
                    this.dispatchAuthEvent({
                        currentActiveUser: undefined,
                        kind: AuthEvent_1.AuthEventKind.ActiveUserChanged,
                        previousActiveUser: loggedOutUser
                    });
                }
            }
        }
        catch (err) {
            throw new StitchClientError_1.default(StitchClientErrorCode_1.StitchClientErrorCode.CouldNotPersistAuthInfo);
        }
    };
    return CoreStitchAuth;
}());
exports.default = CoreStitchAuth;
//# sourceMappingURL=CoreStitchAuth.js.map