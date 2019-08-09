import { CoreStitchServiceClient } from "mongodb-stitch-core-sdk";
import CoreRemoteMongoClient from "./CoreRemoteMongoClient";
import CoreRemoteMongoDatabase from "./CoreRemoteMongoDatabase";
export default class CoreRemoteMongoClientImpl implements CoreRemoteMongoClient {
    readonly service: CoreStitchServiceClient;
    constructor(service: CoreStitchServiceClient);
    db(name: string): CoreRemoteMongoDatabase;
}
