import ProviderCapabilities from "../../ProviderCapabilities";
import StitchCredential from "../../StitchCredential";
export default class ServerApiKeyCredential implements StitchCredential {
    readonly providerName: string;
    readonly providerType: string;
    readonly material: {
        [key: string]: string;
    };
    readonly providerCapabilities: ProviderCapabilities;
    private readonly key;
    constructor(key: string, providerName?: string);
}
