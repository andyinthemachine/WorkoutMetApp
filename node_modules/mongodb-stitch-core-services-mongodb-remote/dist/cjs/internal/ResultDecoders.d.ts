import { Decoder } from "mongodb-stitch-core-sdk";
import ChangeEvent from "../ChangeEvent";
import CompactChangeEvent from "../CompactChangeEvent";
import RemoteDeleteResult from "../RemoteDeleteResult";
import RemoteInsertManyResult from "../RemoteInsertManyResult";
import RemoteInsertOneResult from "../RemoteInsertOneResult";
import RemoteUpdateResult from "../RemoteUpdateResult";
import UpdateDescription from "../UpdateDescription";
declare class RemoteInsertManyResultDecoder implements Decoder<RemoteInsertManyResult> {
    decode(from: any): RemoteInsertManyResult;
}
declare class RemoteInsertOneResultDecoder implements Decoder<RemoteInsertOneResult> {
    decode(from: any): {
        insertedId: any;
    };
}
declare class RemoteUpdateResultDecoder implements Decoder<RemoteUpdateResult> {
    decode(from: any): {
        matchedCount: any;
        modifiedCount: any;
        upsertedId: any;
    };
}
declare class RemoteDeleteResultDecoder implements Decoder<RemoteDeleteResult> {
    decode(from: any): {
        deletedCount: any;
    };
}
declare class UpdateDescriptionDecoder implements Decoder<UpdateDescription> {
    decode(from: any): UpdateDescription;
}
declare class ChangeEventDecoder<T> implements Decoder<ChangeEvent<T>> {
    private readonly decoder?;
    constructor(decoder?: Decoder<T>);
    decode(from: any): ChangeEvent<T>;
}
declare class CompactChangeEventDecoder<T> implements Decoder<CompactChangeEvent<T>> {
    private readonly decoder?;
    constructor(decoder?: Decoder<T>);
    decode(from: any): CompactChangeEvent<T>;
}
export default class ResultDecoders {
    static remoteInsertManyResultDecoder: RemoteInsertManyResultDecoder;
    static remoteInsertOneResultDecoder: RemoteInsertOneResultDecoder;
    static remoteUpdateResultDecoder: RemoteUpdateResultDecoder;
    static remoteDeleteResultDecoder: RemoteDeleteResultDecoder;
    static updateDescriptionDecoder: UpdateDescriptionDecoder;
    static ChangeEventDecoder: typeof ChangeEventDecoder;
    static CompactChangeEventDecoder: typeof CompactChangeEventDecoder;
}
export {};
