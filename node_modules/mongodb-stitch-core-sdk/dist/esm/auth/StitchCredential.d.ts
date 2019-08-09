import ProviderCapabilities from "./ProviderCapabilities";
export default interface StitchCredential {
    readonly providerName: string;
    readonly providerType: string;
    readonly material: {
        [key: string]: string;
    };
    providerCapabilities: ProviderCapabilities;
}
