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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bson_1 = require("bson");
var ApiAppMetadata_1 = __importDefault(require("./ApiAppMetadata"));
var BaseStitchRequestClient_1 = __importDefault(require("./BaseStitchRequestClient"));
var Method_1 = __importDefault(require("./Method"));
var StitchAppRoutes_1 = __importDefault(require("./StitchAppRoutes"));
var StitchRequest_1 = require("./StitchRequest");
var StitchAppRequestClient = (function (_super) {
    __extends(StitchAppRequestClient, _super);
    function StitchAppRequestClient(clientAppId, baseUrl, transport) {
        var _this = _super.call(this, baseUrl, transport) || this;
        _this.clientAppId = clientAppId;
        _this.routes = new StitchAppRoutes_1.default(clientAppId);
        return _this;
    }
    StitchAppRequestClient.prototype.doRequest = function (stitchReq) {
        var _this = this;
        return this.initAppMetadata()
            .then(function (metadata) { return _super.prototype.doRequestToURL.call(_this, stitchReq, metadata.hostname); });
    };
    StitchAppRequestClient.prototype.doStreamRequest = function (stitchReq, open, retryRequest) {
        var _this = this;
        if (open === void 0) { open = true; }
        return this.initAppMetadata()
            .then(function (metadata) { return _super.prototype.doStreamRequestToURL.call(_this, stitchReq, metadata.hostname, open, retryRequest); });
    };
    StitchAppRequestClient.prototype.getBaseURL = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.initAppMetadata().then(function (metadata) { return metadata.hostname; })];
            });
        });
    };
    StitchAppRequestClient.prototype.initAppMetadata = function () {
        var _this = this;
        if (this.appMetadata) {
            return Promise.resolve(this.appMetadata);
        }
        var request = new StitchRequest_1.StitchRequest.Builder()
            .withMethod(Method_1.default.GET)
            .withPath(this.routes.appMetadataRoute)
            .build();
        return _super.prototype.doRequestToURL.call(this, request, this.baseUrl)
            .then(function (resp) {
            _this.appMetadata = ApiAppMetadata_1.default.fromJSON(bson_1.EJSON.parse(resp.body));
            return _this.appMetadata;
        });
    };
    return StitchAppRequestClient;
}(BaseStitchRequestClient_1.default));
exports.default = StitchAppRequestClient;
//# sourceMappingURL=StitchAppRequestClient.js.map