import Method from "./Method";
export declare class StitchRequest {
    readonly method: Method;
    readonly path: string;
    readonly headers: {
        [key: string]: string;
    };
    readonly body?: string;
    readonly startedAt: number;
    constructor(method: Method, path: string, headers: {
        [key: string]: string;
    }, startedAt: number, body?: string);
    readonly builder: StitchRequest.Builder;
}
export declare namespace StitchRequest {
    class Builder {
        method?: Method;
        path?: string;
        headers?: {
            [key: string]: string;
        };
        body?: string;
        startedAt?: number;
        constructor(request?: StitchRequest);
        withMethod(method: Method): this;
        withPath(path: string): this;
        withHeaders(headers: {
            [key: string]: string;
        }): this;
        withBody(body: string): this;
        build(): StitchRequest;
    }
}
