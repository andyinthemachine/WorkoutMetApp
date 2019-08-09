export default class Headers {
    static readonly CONTENT_TYPE_CANON: string;
    static readonly CONTENT_TYPE: string;
    static readonly AUTHORIZATION_CANON: string;
    static readonly AUTHORIZATION: string;
    static readonly ACCEPT_CANON: string;
    static readonly ACCEPT: string;
    static getAuthorizationBearer(value: string): string;
    private static readonly AUTHORIZATION_BEARER;
}
