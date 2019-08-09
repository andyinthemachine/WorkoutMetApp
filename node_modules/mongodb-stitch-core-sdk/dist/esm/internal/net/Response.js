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
export default Response;
//# sourceMappingURL=Response.js.map