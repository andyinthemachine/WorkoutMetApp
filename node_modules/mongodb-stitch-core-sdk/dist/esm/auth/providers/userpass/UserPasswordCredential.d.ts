import ProviderCapabilities from "../../ProviderCapabilities";
import StitchCredential from "../../StitchCredential";
export default class UserPasswordCredential implements StitchCredential {
    readonly username: string;
    readonly password: string;
    readonly providerName: string;
    providerType: string;
    readonly material: {
        [key: string]: string;
    };
    readonly providerCapabilities: ProviderCapabilities;
    constructor(username: string, password: string, providerName?: string);
}
