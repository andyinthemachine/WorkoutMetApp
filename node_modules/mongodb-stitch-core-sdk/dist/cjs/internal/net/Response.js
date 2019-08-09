"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Response = (function () {
    function Response(headers, statusCode, body) {
        var _this = this;
        this.statusCode = statusCode;
        this.body = body;
        this.headers = {};
        Object.keys(headers).map(function (key, index) {
            _this.headers[key.toLocaleLowerCase()] = headers[key];
        });
    }
    return Response;
}());
exports.default = Response;
//# sourceMappingURL=Response.js.map