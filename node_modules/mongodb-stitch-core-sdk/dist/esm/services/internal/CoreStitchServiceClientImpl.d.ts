import StitchAuthRequestClient from "../../auth/internal/StitchAuthRequestClient";
import { Decoder } from "../../internal/common/Codec";
import Stream from "../../Stream";
import CoreStitchServiceClient from "./CoreStitchServiceClient";
import { RebindEvent } from './RebindEvent';
import StitchServiceBinder from './StitchServiceBinder';
import StitchServiceRoutes from "./StitchServiceRoutes";
export default class CoreStitchServiceClientImpl implements CoreStitchServiceClient {
    private readonly requestClient;
    private readonly serviceRoutes;
    private readonly serviceName;
    private serviceBinders;
    private allocatedStreams;
    private readonly serviceField;
    private readonly argumentsField;
    constructor(requestClient: StitchAuthRequestClient, routes: StitchServiceRoutes, name?: string);
    callFunction<T>(name: string, args: any[], decoder?: Decoder<T>): Promise<T>;
    streamFunction<T>(name: string, args: any[], decoder?: Decoder<T>): Promise<Stream<T>>;
    bind(binder: StitchServiceBinder): void;
    onRebindEvent(rebindEvent: RebindEvent): void;
    private getStreamServiceFunctionRequest;
    private getCallServiceFunctionRequest;
    private closeAllocatedStreams;
}
