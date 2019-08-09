import Method from "./Method";
export declare class BasicRequest {
    readonly method: Method;
    readonly url: string;
    readonly headers: {
        [key: string]: string;
    };
    readonly body?: string;
    constructor(method: Method, url: string, headers: {
        [key: string]: string;
    }, body?: string);
}
export declare namespace BasicRequest {
    class Builder {
        method?: Method;
        url?: string;
        headers?: {
            [key: string]: string;
        };
        body?: string;
        constructor(request?: BasicRequest);
        withMethod(method: Method): this;
        withUrl(url: string): this;
        withHeaders(headers: {
            [key: string]: string;
        }): this;
        withBody(body?: string): this;
        build(): BasicRequest;
    }
}
