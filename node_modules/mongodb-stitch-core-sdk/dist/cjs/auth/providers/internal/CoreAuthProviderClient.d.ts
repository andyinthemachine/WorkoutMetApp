export default abstract class CoreAuthProviderClient<RequestClientType> {
    protected readonly providerName: string;
    protected readonly requestClient: RequestClientType;
    protected readonly baseRoute: string;
    protected constructor(providerName: string, requestClient: RequestClientType, baseRoute: string);
}
