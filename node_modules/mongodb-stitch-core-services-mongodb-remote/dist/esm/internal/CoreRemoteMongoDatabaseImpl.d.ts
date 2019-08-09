import { Codec, CoreStitchServiceClient } from "mongodb-stitch-core-sdk";
import CoreRemoteMongoCollection from "./CoreRemoteMongoCollection";
import CoreRemoteMongoDatabase from "./CoreRemoteMongoDatabase";
export default class CoreRemoteMongoDatabaseImpl implements CoreRemoteMongoDatabase {
    readonly name: string;
    private readonly service;
    constructor(name: string, service: CoreStitchServiceClient);
    collection<T>(name: string, codec?: Codec<T>): CoreRemoteMongoCollection<T>;
}
