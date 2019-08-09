"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StitchServiceErrorCode;
(function (StitchServiceErrorCode) {
    StitchServiceErrorCode[StitchServiceErrorCode["MissingAuthReq"] = 0] = "MissingAuthReq";
    StitchServiceErrorCode[StitchServiceErrorCode["InvalidSession"] = 1] = "InvalidSession";
    StitchServiceErrorCode[StitchServiceErrorCode["UserAppDomainMismatch"] = 2] = "UserAppDomainMismatch";
    StitchServiceErrorCode[StitchServiceErrorCode["DomainNotAllowed"] = 3] = "DomainNotAllowed";
    StitchServiceErrorCode[StitchServiceErrorCode["ReadSizeLimitExceeded"] = 4] = "ReadSizeLimitExceeded";
    StitchServiceErrorCode[StitchServiceErrorCode["InvalidParameter"] = 5] = "InvalidParameter";
    StitchServiceErrorCode[StitchServiceErrorCode["MissingParameter"] = 6] = "MissingParameter";
    StitchServiceErrorCode[StitchServiceErrorCode["TwilioError"] = 7] = "TwilioError";
    StitchServiceErrorCode[StitchServiceErrorCode["GCMError"] = 8] = "GCMError";
    StitchServiceErrorCode[StitchServiceErrorCode["HTTPError"] = 9] = "HTTPError";
    StitchServiceErrorCode[StitchServiceErrorCode["AWSError"] = 10] = "AWSError";
    StitchServiceErrorCode[StitchServiceErrorCode["MongoDBError"] = 11] = "MongoDBError";
    StitchServiceErrorCode[StitchServiceErrorCode["ArgumentsNotAllowed"] = 12] = "ArgumentsNotAllowed";
    StitchServiceErrorCode[StitchServiceErrorCode["FunctionExecutionError"] = 13] = "FunctionExecutionError";
    StitchServiceErrorCode[StitchServiceErrorCode["NoMatchingRuleFound"] = 14] = "NoMatchingRuleFound";
    StitchServiceErrorCode[StitchServiceErrorCode["InternalServerError"] = 15] = "InternalServerError";
    StitchServiceErrorCode[StitchServiceErrorCode["AuthProviderNotFound"] = 16] = "AuthProviderNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["AuthProviderAlreadyExists"] = 17] = "AuthProviderAlreadyExists";
    StitchServiceErrorCode[StitchServiceErrorCode["ServiceNotFound"] = 18] = "ServiceNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["ServiceTypeNotFound"] = 19] = "ServiceTypeNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["ServiceAlreadyExists"] = 20] = "ServiceAlreadyExists";
    StitchServiceErrorCode[StitchServiceErrorCode["ServiceCommandNotFound"] = 21] = "ServiceCommandNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["ValueNotFound"] = 22] = "ValueNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["ValueAlreadyExists"] = 23] = "ValueAlreadyExists";
    StitchServiceErrorCode[StitchServiceErrorCode["ValueDuplicateName"] = 24] = "ValueDuplicateName";
    StitchServiceErrorCode[StitchServiceErrorCode["FunctionNotFound"] = 25] = "FunctionNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["FunctionAlreadyExists"] = 26] = "FunctionAlreadyExists";
    StitchServiceErrorCode[StitchServiceErrorCode["FunctionDuplicateName"] = 27] = "FunctionDuplicateName";
    StitchServiceErrorCode[StitchServiceErrorCode["FunctionSyntaxError"] = 28] = "FunctionSyntaxError";
    StitchServiceErrorCode[StitchServiceErrorCode["FunctionInvalid"] = 29] = "FunctionInvalid";
    StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookNotFound"] = 30] = "IncomingWebhookNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookAlreadyExists"] = 31] = "IncomingWebhookAlreadyExists";
    StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookDuplicateName"] = 32] = "IncomingWebhookDuplicateName";
    StitchServiceErrorCode[StitchServiceErrorCode["RuleNotFound"] = 33] = "RuleNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["ApiKeyNotFound"] = 34] = "ApiKeyNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["RuleAlreadyExists"] = 35] = "RuleAlreadyExists";
    StitchServiceErrorCode[StitchServiceErrorCode["RuleDuplicateName"] = 36] = "RuleDuplicateName";
    StitchServiceErrorCode[StitchServiceErrorCode["AuthProviderDuplicateName"] = 37] = "AuthProviderDuplicateName";
    StitchServiceErrorCode[StitchServiceErrorCode["RestrictedHost"] = 38] = "RestrictedHost";
    StitchServiceErrorCode[StitchServiceErrorCode["ApiKeyAlreadyExists"] = 39] = "ApiKeyAlreadyExists";
    StitchServiceErrorCode[StitchServiceErrorCode["IncomingWebhookAuthFailed"] = 40] = "IncomingWebhookAuthFailed";
    StitchServiceErrorCode[StitchServiceErrorCode["ExecutionTimeLimitExceeded"] = 41] = "ExecutionTimeLimitExceeded";
    StitchServiceErrorCode[StitchServiceErrorCode["FunctionNotCallable"] = 42] = "FunctionNotCallable";
    StitchServiceErrorCode[StitchServiceErrorCode["UserAlreadyConfirmed"] = 43] = "UserAlreadyConfirmed";
    StitchServiceErrorCode[StitchServiceErrorCode["UserNotFound"] = 44] = "UserNotFound";
    StitchServiceErrorCode[StitchServiceErrorCode["UserDisabled"] = 45] = "UserDisabled";
    StitchServiceErrorCode[StitchServiceErrorCode["Unknown"] = 46] = "Unknown";
})(StitchServiceErrorCode = exports.StitchServiceErrorCode || (exports.StitchServiceErrorCode = {}));
var apiErrorCodes = {
    APIKeyAlreadyExists: StitchServiceErrorCode.ApiKeyAlreadyExists,
    APIKeyNotFound: StitchServiceErrorCode.ApiKeyNotFound,
    AWSError: StitchServiceErrorCode.AWSError,
    ArgumentsNotAllowed: StitchServiceErrorCode.ArgumentsNotAllowed,
    AuthProviderAlreadyExists: StitchServiceErrorCode.AuthProviderAlreadyExists,
    AuthProviderDuplicateName: StitchServiceErrorCode.AuthProviderDuplicateName,
    AuthProviderNotFound: StitchServiceErrorCode.AuthProviderNotFound,
    DomainNotAllowed: StitchServiceErrorCode.DomainNotAllowed,
    ExecutionTimeLimitExceeded: StitchServiceErrorCode.ExecutionTimeLimitExceeded,
    FunctionAlreadyExists: StitchServiceErrorCode.FunctionAlreadyExists,
    FunctionDuplicateName: StitchServiceErrorCode.FunctionDuplicateName,
    FunctionExecutionError: StitchServiceErrorCode.FunctionExecutionError,
    FunctionInvalid: StitchServiceErrorCode.FunctionInvalid,
    FunctionNotCallable: StitchServiceErrorCode.FunctionNotCallable,
    FunctionNotFound: StitchServiceErrorCode.FunctionNotFound,
    FunctionSyntaxError: StitchServiceErrorCode.FunctionSyntaxError,
    GCMError: StitchServiceErrorCode.GCMError,
    HTTPError: StitchServiceErrorCode.HTTPError,
    IncomingWebhookAlreadyExists: StitchServiceErrorCode.IncomingWebhookAlreadyExists,
    IncomingWebhookAuthFailed: StitchServiceErrorCode.IncomingWebhookAuthFailed,
    IncomingWebhookDuplicateName: StitchServiceErrorCode.IncomingWebhookDuplicateName,
    IncomingWebhookNotFound: StitchServiceErrorCode.IncomingWebhookNotFound,
    InternalServerError: StitchServiceErrorCode.InternalServerError,
    InvalidParameter: StitchServiceErrorCode.InvalidParameter,
    InvalidSession: StitchServiceErrorCode.InvalidSession,
    MissingAuthReq: StitchServiceErrorCode.MissingAuthReq,
    MissingParameter: StitchServiceErrorCode.MissingParameter,
    MongoDBError: StitchServiceErrorCode.MongoDBError,
    NoMatchingRuleFound: StitchServiceErrorCode.NoMatchingRuleFound,
    ReadSizeLimitExceeded: StitchServiceErrorCode.ReadSizeLimitExceeded,
    RestrictedHost: StitchServiceErrorCode.RestrictedHost,
    RuleAlreadyExists: StitchServiceErrorCode.RuleAlreadyExists,
    RuleDuplicateName: StitchServiceErrorCode.RuleDuplicateName,
    RuleNotFound: StitchServiceErrorCode.RuleNotFound,
    ServiceAlreadyExists: StitchServiceErrorCode.ServiceAlreadyExists,
    ServiceCommandNotFound: StitchServiceErrorCode.ServiceCommandNotFound,
    ServiceNotFound: StitchServiceErrorCode.ServiceNotFound,
    ServiceTypeNotFound: StitchServiceErrorCode.ServiceTypeNotFound,
    TwilioError: StitchServiceErrorCode.TwilioError,
    UserAlreadyConfirmed: StitchServiceErrorCode.UserAlreadyConfirmed,
    UserAppDomainMismatch: StitchServiceErrorCode.UserAppDomainMismatch,
    UserDisabled: StitchServiceErrorCode.UserDisabled,
    UserNotFound: StitchServiceErrorCode.UserNotFound,
    ValueAlreadyExists: StitchServiceErrorCode.ValueAlreadyExists,
    ValueDuplicateName: StitchServiceErrorCode.ValueDuplicateName,
    ValueNotFound: StitchServiceErrorCode.ValueNotFound
};
function stitchServiceErrorCodeFromApi(code) {
    if (!(code in apiErrorCodes)) {
        return StitchServiceErrorCode.Unknown;
    }
    return apiErrorCodes[code];
}
exports.stitchServiceErrorCodeFromApi = stitchServiceErrorCodeFromApi;
//# sourceMappingURL=StitchServiceErrorCode.js.map