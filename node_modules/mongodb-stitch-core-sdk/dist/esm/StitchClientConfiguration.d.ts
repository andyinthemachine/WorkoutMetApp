import { Storage } from "./internal/common/Storage";
import Transport from "./internal/net/Transport";
export declare class StitchClientConfiguration {
    readonly baseUrl: string;
    readonly storage: Storage;
    readonly dataDirectory: string;
    readonly transport: Transport;
    constructor(baseUrl: string, storage: Storage, dataDirectory: string, transport: Transport);
    builder(): StitchClientConfiguration.Builder;
}
export declare namespace StitchClientConfiguration {
    class Builder {
        baseUrl: string;
        storage: Storage;
        dataDirectory: string;
        transport: Transport;
        constructor(config?: StitchClientConfiguration);
        withBaseUrl(baseUrl: string): this;
        withStorage(storage: Storage): this;
        withDataDirectory(dataDirectory: string): this;
        withTransport(transport: Transport): this;
        build(): StitchClientConfiguration;
    }
}
