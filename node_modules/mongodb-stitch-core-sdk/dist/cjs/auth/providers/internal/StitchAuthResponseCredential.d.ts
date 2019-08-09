import AuthInfo from "../../internal/AuthInfo";
import ProviderCapabilities from "../../ProviderCapabilities";
import StitchCredential from "../../StitchCredential";
export default class StitchAuthResponseCredential implements StitchCredential {
    readonly authInfo: AuthInfo;
    readonly providerType: string;
    readonly providerName: string;
    readonly asLink: boolean;
    providerCapabilities: ProviderCapabilities;
    readonly material: {
        [key: string]: string;
    };
    constructor(authInfo: AuthInfo, providerType: string, providerName: string, asLink: boolean);
}
