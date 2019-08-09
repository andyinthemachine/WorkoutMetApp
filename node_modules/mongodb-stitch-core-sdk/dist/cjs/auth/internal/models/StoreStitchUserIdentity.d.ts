import StitchUserIdentity from "../../StitchUserIdentity";
export default class StoreStitchUserIdentity extends StitchUserIdentity {
    static decode(from: object): StoreStitchUserIdentity;
    id: string;
    providerType: string;
    constructor(id: string, providerType: string);
    encode(): object;
}
