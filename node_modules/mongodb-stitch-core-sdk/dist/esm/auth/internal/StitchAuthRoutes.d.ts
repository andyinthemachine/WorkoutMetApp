export interface StitchAuthRoutes {
    sessionRoute: string;
    profileRoute: string;
    baseAuthRoute: string;
    getAuthProviderRoute(providerName: string): string;
    getAuthProviderLoginRoute(providerName: string): string;
    getAuthProviderLinkRoute(providerName: string): string;
    getAuthProviderExtensionRoute(providerName: string, path: string): any;
}
