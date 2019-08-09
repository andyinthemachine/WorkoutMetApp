import CoreStitchUser from "./CoreStitchUser";
import StitchUserProfileImpl from "./StitchUserProfileImpl";
interface StitchUserFactory<T extends CoreStitchUser> {
    makeUser(id: string, loggedInProviderType: string, loggedInProviderName: string, isLoggedIn: boolean, lastAuthActivity: Date, userProfile?: StitchUserProfileImpl): T;
}
export default StitchUserFactory;
