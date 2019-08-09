import StitchUserProfileImpl from "./StitchUserProfileImpl";
export default class AuthInfo {
    static empty(): AuthInfo;
    readonly hasUser: boolean;
    readonly isEmpty: boolean;
    readonly userId?: string;
    readonly deviceId?: string;
    readonly accessToken?: string;
    readonly refreshToken?: string;
    readonly loggedInProviderType?: string;
    readonly loggedInProviderName?: string;
    readonly userProfile?: StitchUserProfileImpl;
    readonly lastAuthActivity?: Date;
    constructor(userId?: string, deviceId?: string, accessToken?: string, refreshToken?: string, loggedInProviderType?: string, loggedInProviderName?: string, lastAuthActivity?: Date, userProfile?: StitchUserProfileImpl);
    loggedOut(): AuthInfo;
    withClearedUser(): AuthInfo;
    withAuthProvider(providerType: string, providerName: string): AuthInfo;
    withNewAuthActivityTime(): AuthInfo;
    readonly isLoggedIn: boolean;
    merge(newInfo: AuthInfo): AuthInfo;
}
