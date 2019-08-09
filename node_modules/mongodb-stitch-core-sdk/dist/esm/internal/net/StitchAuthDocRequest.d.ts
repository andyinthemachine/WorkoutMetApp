import { StitchAuthRequest } from "./StitchAuthRequest";
import { StitchRequest } from "./StitchRequest";
export declare class StitchAuthDocRequest extends StitchAuthRequest {
    readonly document: object;
    constructor(request: StitchAuthRequest | StitchRequest, document: object);
    readonly builder: StitchAuthDocRequest.Builder;
}
export declare namespace StitchAuthDocRequest {
    class Builder extends StitchAuthRequest.Builder {
        document: object;
        constructor(request?: StitchAuthDocRequest);
        withDocument(document: object): this;
        withAccessToken(): this;
        build(): StitchAuthDocRequest;
    }
}
