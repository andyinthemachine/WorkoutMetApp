import StitchUserProfileImpl from "../StitchUserProfileImpl";
import StoreStitchUserIdentity from "./StoreStitchUserIdentity";
export default class StoreCoreUserProfile extends StitchUserProfileImpl {
    readonly userType: string;
    readonly data: {
        [key: string]: string;
    };
    readonly identities: StoreStitchUserIdentity[];
    static decode(from: object): StoreCoreUserProfile | undefined;
    constructor(userType: string, data: {
        [key: string]: string;
    }, identities: StoreStitchUserIdentity[]);
    encode(): object;
}
