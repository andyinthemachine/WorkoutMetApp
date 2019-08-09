import { CoreRemoteMongoReadOperation } from "mongodb-stitch-core-services-mongodb-remote";
import RemoteMongoCursor from "./RemoteMongoCursor";
export default class RemoteMongoReadOperation<T> {
    private readonly proxy;
    constructor(proxy: CoreRemoteMongoReadOperation<T>);
    first(): Promise<T | undefined>;
    toArray(): Promise<T[]>;
    asArray(): Promise<T[]>;
    iterator(): Promise<RemoteMongoCursor<T>>;
}
