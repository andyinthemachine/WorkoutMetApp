import CoreStitchAuth from "./CoreStitchAuth";
import CoreStitchUser from "./CoreStitchUser";
export default class AccessTokenRefresher<T extends CoreStitchUser> {
    readonly auth: CoreStitchAuth<T>;
    private nextTimeout;
    constructor(auth: CoreStitchAuth<T>);
    shouldRefresh(): boolean;
    run(): void;
    stop(): void;
}
