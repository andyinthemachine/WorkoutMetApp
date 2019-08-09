import StitchUserProfileImpl from "../StitchUserProfileImpl";
import ApiStitchUserIdentity from "./ApiStitchUserIdentity";
export default class ApiCoreUserProfile extends StitchUserProfileImpl {
    static fromJSON(json: object): ApiCoreUserProfile;
    constructor(userType: string, data: {
        [key: string]: any;
    }, identities: ApiStitchUserIdentity[]);
    toJSON(): object;
}
