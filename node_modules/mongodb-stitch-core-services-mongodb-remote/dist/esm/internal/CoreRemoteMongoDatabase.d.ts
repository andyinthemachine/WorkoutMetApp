import { Codec } from "mongodb-stitch-core-sdk";
import CoreRemoteMongoCollection from "./CoreRemoteMongoCollection";
export default interface CoreRemoteMongoDatabase {
    readonly name: string;
    collection<T>(name: string, codec?: Codec<T>): CoreRemoteMongoCollection<T>;
}
