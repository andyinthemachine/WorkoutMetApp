import ProviderCapabilities from "../../ProviderCapabilities";
import StitchCredential from "../../StitchCredential";
export default class AnonymousCredential implements StitchCredential {
    readonly providerName: string;
    readonly providerType: string;
    readonly material: {};
    readonly providerCapabilities: ProviderCapabilities;
    constructor(providerName?: string);
}
