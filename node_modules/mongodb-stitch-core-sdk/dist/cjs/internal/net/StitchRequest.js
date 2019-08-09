"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StitchRequest = (function () {
    function StitchRequest(method, path, headers, startedAt, body) {
        this.method = method;
        this.path = path;
        this.headers = headers;
        this.body = body;
        this.startedAt = startedAt;
    }
    Object.defineProperty(StitchRequest.prototype, "builder", {
        get: function () {
            return new StitchRequest.Builder(this);
        },
        enumerable: true,
        configurable: true
    });
    return StitchRequest;
}());
exports.StitchRequest = StitchRequest;
(function (StitchRequest) {
    var Builder = (function () {
        function Builder(request) {
            if (request !== undefined) {
                this.method = request.method;
                this.path = request.path;
                this.headers = request.headers;
                this.body = request.body;
                this.startedAt = request.startedAt;
            }
        }
        Builder.prototype.withMethod = function (method) {
            this.method = method;
            return this;
        };
        Builder.prototype.withPath = function (path) {
            this.path = path;
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
                throw Error("must set method");
            }
            if (this.path === undefined) {
                throw Error("must set non-empty path");
            }
            if (this.startedAt === undefined) {
                this.startedAt = Date.now() / 1000;
            }
            return new StitchRequest(this.method, this.path, this.headers === undefined ? {} : this.headers, this.startedAt, this.body);
        };
        return Builder;
    }());
    StitchRequest.Builder = Builder;
})(StitchRequest = exports.StitchRequest || (exports.StitchRequest = {}));
exports.StitchRequest = StitchRequest;
//# sourceMappingURL=StitchRequest.js.map