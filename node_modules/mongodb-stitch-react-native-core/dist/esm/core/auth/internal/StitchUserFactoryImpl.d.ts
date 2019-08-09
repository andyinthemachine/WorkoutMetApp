import { StitchUserFactory, StitchUserProfileImpl } from "mongodb-stitch-core-sdk";
import StitchUser from "../StitchUser";
import StitchAuthImpl from "./StitchAuthImpl";
export default class StitchUserFactoryImpl implements StitchUserFactory<StitchUser> {
    private readonly auth;
    constructor(auth: StitchAuthImpl);
    makeUser(id: string, loggedInProviderType: string, loggedInProviderName: string, isLoggedIn: boolean, lastAuthActivity: Date, userProfile: StitchUserProfileImpl): StitchUser;
}
