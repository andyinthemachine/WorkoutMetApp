import AuthInfo from "../AuthInfo";
export default class ApiAuthInfo extends AuthInfo {
    static fromJSON(json: object): ApiAuthInfo;
    constructor(userId: string, deviceId: string, accessToken: string, refreshToken?: string);
    toJSON(): object;
}
