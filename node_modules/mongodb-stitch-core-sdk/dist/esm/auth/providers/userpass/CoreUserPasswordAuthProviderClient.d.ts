import StitchRequestClient from "../../../internal/net/StitchRequestClient";
import { StitchAuthRoutes } from "../../internal/StitchAuthRoutes";
import CoreAuthProviderClient from "../internal/CoreAuthProviderClient";
export default class CoreUserPasswordAuthProviderClient extends CoreAuthProviderClient<StitchRequestClient> {
    constructor(providerName: string | undefined, requestClient: StitchRequestClient, authRoutes: StitchAuthRoutes);
    registerWithEmailInternal(email: string, password: string): Promise<void>;
    protected confirmUserInternal(token: string, tokenId: string): Promise<void>;
    protected resendConfirmationEmailInternal(email: string): Promise<void>;
    protected resetPasswordInternal(token: string, tokenId: string, password: string): Promise<void>;
    protected sendResetPasswordEmailInternal(email: string): Promise<void>;
    private getRegisterWithEmailRoute;
    private getConfirmUserRoute;
    private getResendConfirmationEmailRoute;
    private getResetPasswordRoute;
    private getSendResetPasswordEmailRoute;
    private getExtensionRoute;
}
