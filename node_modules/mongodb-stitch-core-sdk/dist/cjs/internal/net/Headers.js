"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Headers = (function () {
    function Headers() {
    }
    Headers.getAuthorizationBearer = function (value) {
        return Headers.AUTHORIZATION_BEARER + " " + value;
    };
    Headers.CONTENT_TYPE_CANON = "Content-Type";
    Headers.CONTENT_TYPE = Headers.CONTENT_TYPE_CANON.toLocaleLowerCase();
    Headers.AUTHORIZATION_CANON = "Authorization";
    Headers.AUTHORIZATION = Headers.AUTHORIZATION_CANON.toLocaleLowerCase();
    Headers.ACCEPT_CANON = "Accept";
    Headers.ACCEPT = Headers.ACCEPT_CANON.toLocaleLowerCase();
    Headers.AUTHORIZATION_BEARER = "Bearer";
    return Headers;
}());
exports.default = Headers;
//# sourceMappingURL=Headers.js.map