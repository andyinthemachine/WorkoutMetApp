"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bson_1 = require("bson");
var ContentTypes_1 = __importDefault(require("./ContentTypes"));
var Headers_1 = __importDefault(require("./Headers"));
var StitchRequest_1 = require("./StitchRequest");
var StitchDocRequest = (function (_super) {
    __extends(StitchDocRequest, _super);
    function StitchDocRequest(request, document) {
        var _this = _super.call(this, request.method, request.path, request.headers, request.startedAt, request.body) || this;
        _this.document = document;
        return _this;
    }
    Object.defineProperty(StitchDocRequest.prototype, "builder", {
        get: function () {
            return new StitchDocRequest.Builder(this);
        },
        enumerable: true,
        configurable: true
    });
    return StitchDocRequest;
}(StitchRequest_1.StitchRequest));
exports.StitchDocRequest = StitchDocRequest;
(function (StitchDocRequest) {
    var Builder = (function (_super) {
        __extends(Builder, _super);
        function Builder(request) {
            var _this = _super.call(this, request) || this;
            if (request !== undefined) {
                _this.document = request.document;
            }
            return _this;
        }
        Builder.prototype.withDocument = function (document) {
            this.document = document;
            return this;
        };
        Builder.prototype.build = function () {
            if (this.document === undefined || !(this.document instanceof Object)) {
                throw new Error("document must be set");
            }
            if (this.headers === undefined) {
                this.withHeaders({});
            }
            this.headers[Headers_1.default.CONTENT_TYPE] = ContentTypes_1.default.APPLICATION_JSON;
            this.withBody(bson_1.EJSON.stringify(this.document, { relaxed: false }));
            return new StitchDocRequest(_super.prototype.build.call(this), this.document);
        };
        return Builder;
    }(StitchRequest_1.StitchRequest.Builder));
    StitchDocRequest.Builder = Builder;
})(StitchDocRequest = exports.StitchDocRequest || (exports.StitchDocRequest = {}));
exports.StitchDocRequest = StitchDocRequest;
//# sourceMappingURL=StitchDocRequest.js.map