declare const BASE_ROUTE = "/api/client/v2.0";
declare function getAppRoute(clientAppId: string): string;
declare function getFunctionCallRoute(clientAppId: string): string;
declare function getAppMetadataRoute(clientAppId: string): string;
export { BASE_ROUTE, getAppRoute, getFunctionCallRoute, getAppMetadataRoute };
