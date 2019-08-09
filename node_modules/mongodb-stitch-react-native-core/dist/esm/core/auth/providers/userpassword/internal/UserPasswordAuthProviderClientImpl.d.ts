import { CoreUserPassAuthProviderClient, StitchAuthRoutes, StitchRequestClient } from "mongodb-stitch-core-sdk";
import { UserPasswordAuthProviderClient } from "../UserPasswordAuthProviderClient";
export default class UserPasswordAuthProviderClientImpl extends CoreUserPassAuthProviderClient implements UserPasswordAuthProviderClient {
    constructor(requestClient: StitchRequestClient, routes: StitchAuthRoutes);
    registerWithEmail(email: string, password: string): Promise<void>;
    confirmUser(token: string, tokenId: string): Promise<void>;
    resendConfirmationEmail(email: string): Promise<void>;
    resetPassword(token: string, tokenId: string, password: string): Promise<void>;
    sendResetPasswordEmail(email: string): Promise<void>;
}
