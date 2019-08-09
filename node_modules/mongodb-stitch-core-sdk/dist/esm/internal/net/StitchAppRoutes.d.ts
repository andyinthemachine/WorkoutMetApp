import { StitchAuthRoutes } from "../../auth/internal/StitchAuthRoutes";
import StitchServiceRoutes from "../../services/internal/StitchServiceRoutes";
declare class StitchAppRoutes {
    readonly authRoutes: StitchAuthRoutes;
    readonly serviceRoutes: StitchServiceRoutes;
    readonly functionCallRoute: string;
    readonly appMetadataRoute: string;
    private readonly clientAppId;
    constructor(clientAppId: string);
}
export default StitchAppRoutes;
