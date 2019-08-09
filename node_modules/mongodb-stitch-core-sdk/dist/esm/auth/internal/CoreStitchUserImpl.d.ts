import StitchUserIdentity from "../StitchUserIdentity";
import CoreStitchUser from "./CoreStitchUser";
import StitchUserProfileImpl from "./StitchUserProfileImpl";
export default class CoreStitchUserImpl implements CoreStitchUser {
    readonly id: string;
    readonly loggedInProviderType: string;
    readonly loggedInProviderName: string;
    readonly profile: StitchUserProfileImpl;
    readonly isLoggedIn: boolean;
    readonly lastAuthActivity: Date;
    protected constructor(id: string, loggedInProviderType: string, loggedInProviderName: string, isLoggedIn: boolean, lastAuthActivity: Date, profile?: StitchUserProfileImpl);
    readonly userType: string | undefined;
    readonly identities: StitchUserIdentity[];
    equals(other: CoreStitchUserImpl): boolean;
}
