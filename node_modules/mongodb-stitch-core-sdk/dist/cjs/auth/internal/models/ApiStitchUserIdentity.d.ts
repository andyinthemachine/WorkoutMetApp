import StitchUserIdentity from "../../StitchUserIdentity";
export default class ApiStitchUserIdentity extends StitchUserIdentity {
    static fromJSON(json: object): ApiStitchUserIdentity;
    protected constructor(id: string, providerType: string);
    toJSON(): object;
}
