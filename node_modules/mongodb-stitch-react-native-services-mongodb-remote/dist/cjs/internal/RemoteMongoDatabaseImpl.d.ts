import { Codec } from "mongodb-stitch-core-sdk";
import { CoreRemoteMongoDatabase } from "mongodb-stitch-core-services-mongodb-remote";
import RemoteMongoCollection from "../RemoteMongoCollection";
export default class RemoteMongoDatabaseImpl {
    private readonly proxy;
    readonly name: string;
    constructor(proxy: CoreRemoteMongoDatabase);
    collection<T>(name: string, codec?: Codec<T>): RemoteMongoCollection<T>;
}
