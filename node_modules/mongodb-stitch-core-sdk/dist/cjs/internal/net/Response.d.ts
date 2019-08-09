export default class Response {
    readonly statusCode: number;
    readonly body?: string | undefined;
    readonly headers: {
        [key: string]: string;
    };
    constructor(headers: {
        [key: string]: string;
    }, statusCode: number, body?: string | undefined);
}
