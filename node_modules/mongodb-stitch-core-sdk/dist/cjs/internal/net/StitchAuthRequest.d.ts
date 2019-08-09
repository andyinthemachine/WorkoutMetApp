import { StitchRequest } from "./StitchRequest";
export declare class StitchAuthRequest extends StitchRequest {
    readonly useRefreshToken: boolean;
    readonly shouldRefreshOnFailure: boolean;
    constructor(request: StitchRequest, useRefreshToken?: boolean, shouldRefreshOnFailure?: boolean);
    readonly builder: StitchAuthRequest.Builder;
}
export declare namespace StitchAuthRequest {
    class Builder extends StitchRequest.Builder {
        useRefreshToken: boolean;
        shouldRefreshOnFailure: boolean;
        constructor(request?: StitchAuthRequest);
        withAccessToken(): this;
        withRefreshToken(): this;
        withShouldRefreshOnFailure(shouldRefreshOnFailure: boolean): this;
        build(): StitchAuthRequest;
    }
}
