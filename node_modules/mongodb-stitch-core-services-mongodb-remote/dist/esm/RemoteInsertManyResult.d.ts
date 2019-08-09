export default class RemoteInsertManyResult {
    readonly insertedIds: {
        [key: number]: string;
    };
    constructor(arr: any[]);
}
