export declare enum StitchClientErrorCode {
    LoggedOutDuringRequest = 0,
    MustAuthenticateFirst = 1,
    UserNoLongerValid = 2,
    UserNotFound = 3,
    UserNotLoggedIn = 4,
    CouldNotLoadPersistedAuthInfo = 5,
    CouldNotPersistAuthInfo = 6,
    StreamingNotSupported = 7,
    StreamClosed = 8,
    UnexpectedArguments = 9
}
export declare const clientErrorCodeDescs: {
    [key: number]: string;
};
