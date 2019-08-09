"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base64_1 = require("../../internal/common/Base64");
var EXPIRES = "exp";
var ISSUED_AT = "iat";
var JWT = (function () {
    function JWT(expires, issuedAt) {
        this.expires = expires;
        this.issuedAt = issuedAt;
    }
    JWT.fromEncoded = function (encodedJWT) {
        var parts = JWT.splitToken(encodedJWT);
        var json = JSON.parse(Base64_1.base64Decode(parts[1]));
        var expires = json[EXPIRES];
        var iat = json[ISSUED_AT];
        return new JWT(expires, iat);
    };
    JWT.splitToken = function (jwt) {
        var parts = jwt.split(".");
        if (parts.length !== 3) {
            throw new Error("Malformed JWT token. The string " + jwt + " should have 3 parts.");
        }
        return parts;
    };
    return JWT;
}());
exports.default = JWT;
//# sourceMappingURL=JWT.js.map