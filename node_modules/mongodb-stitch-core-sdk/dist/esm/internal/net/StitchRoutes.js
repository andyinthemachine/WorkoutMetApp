var BASE_ROUTE = "/api/client/v2.0";
function getAppRoute(clientAppId) {
    return BASE_ROUTE + ("/app/" + clientAppId);
}
function getFunctionCallRoute(clientAppId) {
    return getAppRoute(clientAppId) + "/functions/call";
}
function getAppMetadataRoute(clientAppId) {
    return getAppRoute(clientAppId) + "/location";
}
export { BASE_ROUTE, getAppRoute, getFunctionCallRoute, getAppMetadataRoute };
//# sourceMappingURL=StitchRoutes.js.map