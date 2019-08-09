"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BASE_ROUTE = "/api/client/v2.0";
exports.BASE_ROUTE = BASE_ROUTE;
function getAppRoute(clientAppId) {
    return BASE_ROUTE + ("/app/" + clientAppId);
}
exports.getAppRoute = getAppRoute;
function getFunctionCallRoute(clientAppId) {
    return getAppRoute(clientAppId) + "/functions/call";
}
exports.getFunctionCallRoute = getFunctionCallRoute;
function getAppMetadataRoute(clientAppId) {
    return getAppRoute(clientAppId) + "/location";
}
exports.getAppMetadataRoute = getAppMetadataRoute;
//# sourceMappingURL=StitchRoutes.js.map