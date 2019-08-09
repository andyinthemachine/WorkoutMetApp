import { CoreStitchServiceClient, Decoder } from "mongodb-stitch-core-sdk";
export default class CoreRemoteMongoReadOperation<T> {
    private readonly command;
    private readonly args;
    private readonly service;
    private readonly collectionDecoder?;
    constructor(command: string, args: object, service: CoreStitchServiceClient, decoder?: Decoder<T>);
    iterator(): Promise<Iterator<T>>;
    first(): Promise<T | undefined>;
    toArray(): Promise<T[]>;
    asArray(): Promise<T[]>;
    private executeRead;
}
