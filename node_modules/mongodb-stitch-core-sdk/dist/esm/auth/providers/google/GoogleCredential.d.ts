import ProviderCapabilities from "../../ProviderCapabilities";
import StitchCredential from "../../StitchCredential";
export default class GoogleCredential implements StitchCredential {
    readonly providerName: string;
    readonly providerType: string;
    readonly material: {
        [key: string]: string;
    };
    readonly providerCapabilities: ProviderCapabilities;
    private readonly authCode;
    constructor(authCode: string, providerName?: string);
}
