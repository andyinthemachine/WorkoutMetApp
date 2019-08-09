import StitchAuth from "./StitchAuth";
import StitchUser from "./StitchUser";
export default interface StitchAuthListener {
    onAuthEvent?(auth: StitchAuth): any;
    onUserAdded?(auth: StitchAuth, addedUser: StitchUser): any;
    onUserLinked?(auth: StitchAuth, linkedUser: StitchUser): any;
    onUserLoggedIn?(auth: StitchAuth, loggedInUser: StitchUser): any;
    onUserLoggedOut?(auth: StitchAuth, loggedOutUser: StitchUser): any;
    onActiveUserChanged?(auth: StitchAuth, currentActiveUser: StitchUser | undefined, previousActiveUser: StitchUser | undefined): any;
    onUserRemoved?(auth: StitchAuth, removedUser: StitchUser): any;
    onListenerRegistered?(auth: StitchAuth): any;
}
