"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fields;
(function (Fields) {
    Fields["DEPLOYMENT_MODEL"] = "deployment_model";
    Fields["LOCATION"] = "location";
    Fields["HOSTNAME"] = "hostname";
})(Fields || (Fields = {}));
var ApiAppMetadata = (function () {
    function ApiAppMetadata(deploymentModel, location, hostname) {
        this.deploymentModel = deploymentModel;
        this.location = location;
        this.hostname = hostname;
    }
    ApiAppMetadata.fromJSON = function (json) {
        return new ApiAppMetadata(json[Fields.DEPLOYMENT_MODEL], json[Fields.LOCATION], json[Fields.HOSTNAME]);
    };
    ApiAppMetadata.prototype.toJSON = function () {
        var _a;
        return _a = {},
            _a[Fields.DEPLOYMENT_MODEL] = this.deploymentModel,
            _a[Fields.LOCATION] = this.location,
            _a[Fields.HOSTNAME] = this.hostname,
            _a;
    };
    return ApiAppMetadata;
}());
exports.default = ApiAppMetadata;
//# sourceMappingURL=ApiAppMetadata.js.map