var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EJSON } from "bson";
import ContentTypes from "./ContentTypes";
import Headers from "./Headers";
import { StitchAuthRequest } from "./StitchAuthRequest";
var StitchAuthDocRequest = (function (_super) {
    __extends(StitchAuthDocRequest, _super);
    function StitchAuthDocRequest(request, document) {
        var _this = this;
        request instanceof StitchAuthRequest
            ? _this = _super.call(this, request, request.useRefreshToken, request.shouldRefreshOnFailure) || this : _this = _super.call(this, request) || this;
        _this.document = document;
        return _this;
    }
    Object.defineProperty(StitchAuthDocRequest.prototype, "builder", {
        get: function () {
            return new StitchAuthDocRequest.Builder(this);
        },
        enumerable: true,
        configurable: true
    });
    return StitchAuthDocRequest;
}(StitchAuthRequest));
export { StitchAuthDocRequest };
(function (StitchAuthDocRequest) {
    var Builder = (function (_super) {
        __extends(Builder, _super);
        function Builder(request) {
            var _this = _super.call(this, request) || this;
            if (request !== undefined) {
                _this.document = request.document;
                _this.useRefreshToken = request.useRefreshToken;
            }
            return _this;
        }
        Builder.prototype.withDocument = function (document) {
            this.document = document;
            return this;
        };
        Builder.prototype.withAccessToken = function () {
            this.useRefreshToken = false;
            return this;
        };
        Builder.prototype.build = function () {
            if (this.document === undefined || !(this.document instanceof Object)) {
                throw new Error("document must be set: " + this.document);
            }
            if (this.headers === undefined) {
                this.withHeaders({});
            }
            this.headers[Headers.CONTENT_TYPE] = ContentTypes.APPLICATION_JSON;
            this.withBody(EJSON.stringify(this.document, { relaxed: false }));
            return new StitchAuthDocRequest(_super.prototype.build.call(this), this.document);
        };
        return Builder;
    }(StitchAuthRequest.Builder));
    StitchAuthDocRequest.Builder = Builder;
})(StitchAuthDocRequest || (StitchAuthDocRequest = {}));
//# sourceMappingURL=StitchAuthDocRequest.js.map