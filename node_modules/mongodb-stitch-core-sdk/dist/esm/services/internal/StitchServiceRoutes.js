import { getFunctionCallRoute } from "../../internal/net/StitchRoutes";
var StitchServiceRoutes = (function () {
    function StitchServiceRoutes(clientAppId) {
        this.clientAppId = clientAppId;
        this.functionCallRoute = getFunctionCallRoute(clientAppId);
    }
    return StitchServiceRoutes;
}());
export default StitchServiceRoutes;
//# sourceMappingURL=StitchServiceRoutes.js.map