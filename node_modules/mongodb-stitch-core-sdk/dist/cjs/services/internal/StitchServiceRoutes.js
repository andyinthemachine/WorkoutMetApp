"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StitchRoutes_1 = require("../../internal/net/StitchRoutes");
var StitchServiceRoutes = (function () {
    function StitchServiceRoutes(clientAppId) {
        this.clientAppId = clientAppId;
        this.functionCallRoute = StitchRoutes_1.getFunctionCallRoute(clientAppId);
    }
    return StitchServiceRoutes;
}());
exports.default = StitchServiceRoutes;
//# sourceMappingURL=StitchServiceRoutes.js.map