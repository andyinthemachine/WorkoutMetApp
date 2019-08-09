import { Decoder } from "../../internal/common/Codec";
import Stream from "../../Stream";
import StitchServiceBinder from "./StitchServiceBinder";
export default interface CoreStitchServiceClient extends StitchServiceBinder {
    callFunction<T>(name: string, args: any[], decoder?: Decoder<T>): Promise<T>;
    streamFunction<T>(name: string, args: any[], decoder?: Decoder<T>): Promise<Stream<T>>;
    bind(binder: StitchServiceBinder): any;
}
