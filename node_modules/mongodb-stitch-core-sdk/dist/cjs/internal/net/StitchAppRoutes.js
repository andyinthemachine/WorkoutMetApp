"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StitchServiceRoutes_1 = __importDefault(require("../../services/internal/StitchServiceRoutes"));
var StitchAppAuthRoutes_1 = __importDefault(require("./StitchAppAuthRoutes"));
var StitchRoutes_1 = require("./StitchRoutes");
var StitchAppRoutes = (function () {
    function StitchAppRoutes(clientAppId) {
        this.clientAppId = clientAppId;
        this.authRoutes = new StitchAppAuthRoutes_1.default(clientAppId);
        this.serviceRoutes = new StitchServiceRoutes_1.default(clientAppId);
        this.appMetadataRoute = StitchRoutes_1.getAppMetadataRoute(clientAppId);
        this.functionCallRoute = StitchRoutes_1.getFunctionCallRoute(clientAppId);
    }
    return StitchAppRoutes;
}());
exports.default = StitchAppRoutes;
//# sourceMappingURL=StitchAppRoutes.js.map