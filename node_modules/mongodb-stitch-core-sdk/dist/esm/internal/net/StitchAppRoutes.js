import StitchServiceRoutes from "../../services/internal/StitchServiceRoutes";
import StitchAppAuthRoutes from "./StitchAppAuthRoutes";
import { getAppMetadataRoute, getFunctionCallRoute } from "./StitchRoutes";
var StitchAppRoutes = (function () {
    function StitchAppRoutes(clientAppId) {
        this.clientAppId = clientAppId;
        this.authRoutes = new StitchAppAuthRoutes(clientAppId);
        this.serviceRoutes = new StitchServiceRoutes(clientAppId);
        this.appMetadataRoute = getAppMetadataRoute(clientAppId);
        this.functionCallRoute = getFunctionCallRoute(clientAppId);
    }
    return StitchAppRoutes;
}());
export default StitchAppRoutes;
//# sourceMappingURL=StitchAppRoutes.js.map