import ProviderCapabilities from "../../ProviderCapabilities";
import StitchCredential from "../../StitchCredential";
export default class CustomCredential implements StitchCredential {
    providerName: string;
    readonly providerType: string;
    readonly providerCapabilities: ProviderCapabilities;
    readonly material: {
        [key: string]: string;
    };
    private token;
    constructor(token: string, providerName?: string);
}
