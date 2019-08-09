import { Storage } from "../../../internal/common/Storage";
import AuthInfo from "../AuthInfo";
import StoreCoreUserProfile from "./StoreCoreUserProfile";
declare function readActiveUserFromStorage(storage: Storage): AuthInfo | undefined;
declare function readCurrentUsersFromStorage(storage: Storage): Map<string, AuthInfo>;
declare function writeActiveUserAuthInfoToStorage(authInfo: AuthInfo, storage: Storage): void;
declare function writeAllUsersAuthInfoToStorage(currentUsersAuthInfo: Map<string, AuthInfo>, storage: Storage): void;
declare class StoreAuthInfo extends AuthInfo {
    readonly userProfile?: StoreCoreUserProfile | undefined;
    static readonly ACTIVE_USER_STORAGE_NAME: string;
    static readonly ALL_USERS_STORAGE_NAME: string;
    static decode(from: any): StoreAuthInfo;
    constructor(userId: string, deviceId: string, accessToken: string, refreshToken: string, loggedInProviderType: string, loggedInProviderName: string, lastAuthActivity: Date, userProfile?: StoreCoreUserProfile | undefined);
    encode(): object;
}
export { StoreAuthInfo, readActiveUserFromStorage, readCurrentUsersFromStorage, writeActiveUserAuthInfoToStorage, writeAllUsersAuthInfoToStorage };
