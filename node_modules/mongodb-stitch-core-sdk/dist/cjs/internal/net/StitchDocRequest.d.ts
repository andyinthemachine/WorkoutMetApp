import { StitchRequest } from "./StitchRequest";
export declare class StitchDocRequest extends StitchRequest {
    readonly document: object;
    constructor(request: StitchRequest, document: object);
    readonly builder: StitchDocRequest.Builder;
}
export declare namespace StitchDocRequest {
    class Builder extends StitchRequest.Builder {
        document: object;
        constructor(request?: StitchDocRequest);
        withDocument(document: object): this;
        build(): StitchDocRequest;
    }
}
