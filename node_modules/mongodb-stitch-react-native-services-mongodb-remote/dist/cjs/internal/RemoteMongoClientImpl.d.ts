import { CoreRemoteMongoClient } from "mongodb-stitch-core-services-mongodb-remote";
import { RemoteMongoClient } from "../RemoteMongoClient";
import RemoteMongoDatabase from "../RemoteMongoDatabase";
export default class RemoteMongoClientImpl implements RemoteMongoClient {
    private readonly proxy;
    constructor(proxy: CoreRemoteMongoClient);
    db(name: string): RemoteMongoDatabase;
}
