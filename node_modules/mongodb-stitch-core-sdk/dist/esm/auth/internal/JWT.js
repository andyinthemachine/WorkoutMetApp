import { base64Decode } from "../../internal/common/Base64";
var EXPIRES = "exp";
var ISSUED_AT = "iat";
var JWT = (function () {
    function JWT(expires, issuedAt) {
        this.expires = expires;
        this.issuedAt = issuedAt;
    }
    JWT.fromEncoded = function (encodedJWT) {
        var parts = JWT.splitToken(encodedJWT);
        var json = JSON.parse(base64Decode(parts[1]));
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
export default JWT;
//# sourceMappingURL=JWT.js.map