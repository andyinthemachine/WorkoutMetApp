"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicRequest = (function () {
    function BasicRequest(method, url, headers, body) {
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.body = body;
    }
    return BasicRequest;
}());
exports.BasicRequest = BasicRequest;
(function (BasicRequest) {
    var Builder = (function () {
        function Builder(request) {
            if (!request) {
                return;
            }
            this.method = request.method;
            this.url = request.url;
            this.headers = request.headers;
            this.body = request.body;
        }
        Builder.prototype.withMethod = function (method) {
            this.method = method;
            return this;
        };
        Builder.prototype.withUrl = function (url) {
            this.url = url;
            return this;
        };
        Builder.prototype.withHeaders = function (headers) {
            this.headers = headers;
            return this;
        };
        Builder.prototype.withBody = function (body) {
            this.body = body;
            return this;
        };
        Builder.prototype.build = function () {
            if (this.method === undefined) {
                throw new Error("must set method");
            }
            if (this.url === undefined) {
                throw new Error("must set non-empty url");
            }
            return new BasicRequest(this.method, this.url, this.headers === undefined ? {} : this.headers, this.body);
        };
        return Builder;
    }());
    BasicRequest.Builder = Builder;
})(BasicRequest = exports.BasicRequest || (exports.BasicRequest = {}));
exports.BasicRequest = BasicRequest;
//# sourceMappingURL=BasicRequest.js.map