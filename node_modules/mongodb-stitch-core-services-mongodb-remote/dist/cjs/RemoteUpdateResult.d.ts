export default interface RemoteUpdateResult {
    readonly matchedCount: number;
    readonly modifiedCount: number;
    readonly upsertedId: any;
}
