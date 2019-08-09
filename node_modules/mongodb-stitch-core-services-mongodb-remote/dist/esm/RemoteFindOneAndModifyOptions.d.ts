export default interface RemoteFindOneAndModifyOptions {
    readonly projection?: object;
    readonly sort?: object;
    readonly upsert?: boolean;
    readonly returnNewDocument?: boolean;
}
