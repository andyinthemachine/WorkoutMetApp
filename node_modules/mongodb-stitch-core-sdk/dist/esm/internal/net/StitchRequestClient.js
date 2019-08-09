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
import BaseStitchRequestClient from "./BaseStitchRequestClient";
var StitchRequestClient = (function (_super) {
    __extends(StitchRequestClient, _super);
    function StitchRequestClient(baseUrl, transport) {
        return _super.call(this, baseUrl, transport) || this;
    }
    StitchRequestClient.prototype.doRequest = function (stitchReq) {
        return _super.prototype.doRequestToURL.call(this, stitchReq, this.baseUrl);
    };
    StitchRequestClient.prototype.doStreamRequest = function (stitchReq, open, retryRequest) {
        if (open === void 0) { open = true; }
        return _super.prototype.doStreamRequestToURL.call(this, stitchReq, this.baseUrl, open, retryRequest);
    };
    StitchRequestClient.prototype.getBaseURL = function () {
        return Promise.resolve(this.baseUrl);
    };
    return StitchRequestClient;
}(BaseStitchRequestClient));
export default StitchRequestClient;
//# sourceMappingURL=StitchRequestClient.js.map