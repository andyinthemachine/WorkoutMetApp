import { StitchClientConfiguration } from "./StitchClientConfiguration";
export declare class StitchAppClientConfiguration extends StitchClientConfiguration {
    readonly localAppName: string;
    readonly localAppVersion: string;
    constructor(config: StitchClientConfiguration, localAppName: string, localAppVersion: string);
    builder(): StitchAppClientConfiguration.Builder;
}
export declare namespace StitchAppClientConfiguration {
    class Builder extends StitchClientConfiguration.Builder {
        localAppName: string;
        localAppVersion: string;
        constructor(config?: StitchAppClientConfiguration);
        withLocalAppName(localAppName: string): this;
        withLocalAppVersion(localAppVersion: string): this;
        build(): StitchAppClientConfiguration;
    }
}
