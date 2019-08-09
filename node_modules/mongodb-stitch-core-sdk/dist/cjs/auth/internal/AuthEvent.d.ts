import { CoreStitchUser } from "../..";
export declare enum AuthEventKind {
    ActiveUserChanged = 0,
    ListenerRegistered = 1,
    UserAdded = 2,
    UserLinked = 3,
    UserLoggedIn = 4,
    UserLoggedOut = 5,
    UserRemoved = 6
}
export interface ActiveUserChanged<TStitchUser extends CoreStitchUser> {
    kind: AuthEventKind.ActiveUserChanged;
    currentActiveUser: TStitchUser | undefined;
    previousActiveUser: TStitchUser | undefined;
}
export interface ListenerRegistered {
    kind: AuthEventKind.ListenerRegistered;
}
export interface UserAdded<TStitchUser extends CoreStitchUser> {
    kind: AuthEventKind.UserAdded;
    addedUser: TStitchUser;
}
export interface UserLinked<TStitchUser extends CoreStitchUser> {
    kind: AuthEventKind.UserLinked;
    linkedUser: TStitchUser;
}
export interface UserLoggedIn<TStitchUser extends CoreStitchUser> {
    kind: AuthEventKind.UserLoggedIn;
    loggedInUser: TStitchUser;
}
export interface UserLoggedOut<TStitchUser extends CoreStitchUser> {
    kind: AuthEventKind.UserLoggedOut;
    loggedOutUser: TStitchUser;
}
export interface UserRemoved<TStitchUser extends CoreStitchUser> {
    kind: AuthEventKind.UserRemoved;
    removedUser: TStitchUser;
}
export declare type AuthEvent<TStitchUser extends CoreStitchUser> = ActiveUserChanged<TStitchUser> | ListenerRegistered | UserAdded<TStitchUser> | UserLinked<TStitchUser> | UserLoggedIn<TStitchUser> | UserLoggedOut<TStitchUser> | UserRemoved<TStitchUser>;
