import BSON from "bson";
export default class UserApiKey {
    static readFromApi(json: string | object): UserApiKey;
    readonly id: BSON.ObjectID;
    readonly key?: string;
    readonly name: string;
    readonly disabled: boolean;
    constructor(id: string, key: string | undefined, name: string, disabled: boolean);
    toJSON(): object;
}
