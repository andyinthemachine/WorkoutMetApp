import ProviderCapabilities from "../../ProviderCapabilities";
import StitchCredential from "../../StitchCredential";
export default class UserApiKeyCredential implements StitchCredential {
    readonly providerName: string;
    readonly key: string;
    readonly providerType: string;
    readonly material: {
        [key: string]: string;
    };
    readonly providerCapabilities: ProviderCapabilities;
    constructor(key: string, providerName?: string);
}
