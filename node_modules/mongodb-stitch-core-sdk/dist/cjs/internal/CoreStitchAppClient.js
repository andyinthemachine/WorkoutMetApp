"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CoreStitchServiceClientImpl_1 = __importDefault(require("../services/internal/CoreStitchServiceClientImpl"));
var CoreStitchAppClient = (function () {
    function CoreStitchAppClient(authRequestClient, routes) {
        this.functionService =
            new CoreStitchServiceClientImpl_1.default(authRequestClient, routes.serviceRoutes);
    }
    CoreStitchAppClient.prototype.callFunction = function (name, args, decoder) {
        return this.functionService.callFunction(name, args, decoder);
    };
    return CoreStitchAppClient;
}());
exports.default = CoreStitchAppClient;
//# sourceMappingURL=CoreStitchAppClient.js.map