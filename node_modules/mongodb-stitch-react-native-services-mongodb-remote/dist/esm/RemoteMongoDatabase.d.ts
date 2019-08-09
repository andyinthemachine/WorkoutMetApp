import { Codec } from "mongodb-stitch-core-sdk";
import RemoteMongoCollection from "./RemoteMongoCollection";
export default interface RemoteMongoDatabase {
    readonly name: string;
    collection<T>(name: string, codec?: Codec<T>): RemoteMongoCollection<T>;
}
