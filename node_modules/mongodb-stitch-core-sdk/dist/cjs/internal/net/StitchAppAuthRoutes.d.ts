import { StitchAuthRoutes } from "../../auth/internal/StitchAuthRoutes";
export default class StitchAppAuthRoutes implements StitchAuthRoutes {
    readonly baseAuthRoute: string;
    readonly sessionRoute: string;
    readonly profileRoute: string;
    private readonly clientAppId;
    constructor(clientAppId: string);
    getAuthProviderRoute(providerName: string): string;
    getAuthProviderLoginRoute(providerName: string): string;
    getAuthProviderLinkRoute(providerName: string): string;
    getAuthProviderExtensionRoute(providerName: string, path: string): string;
}
