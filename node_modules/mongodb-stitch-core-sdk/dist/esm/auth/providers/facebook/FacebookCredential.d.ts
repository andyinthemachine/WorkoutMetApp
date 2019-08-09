import ProviderCapabilities from "../../ProviderCapabilities";
import StitchCredential from "../../StitchCredential";
export default class FacebookCredential implements StitchCredential {
    readonly providerCapabilities: ProviderCapabilities;
    readonly providerName: string;
    readonly providerType: string;
    readonly material: {
        [key: string]: string;
    };
    private readonly accessToken;
    constructor(accessToken: string, providerName?: string);
}
