import AuthProviderClientFactory from "../internal/AuthProviderClientFactory";
export interface UserPasswordAuthProviderClient {
    registerWithEmail(email: string, password: string): Promise<void>;
    confirmUser(token: string, tokenId: string): Promise<void>;
    resendConfirmationEmail(email: string): Promise<void>;
    resetPassword(token: string, tokenId: string, password: string): Promise<void>;
    sendResetPasswordEmail(email: string): Promise<void>;
}
export declare namespace UserPasswordAuthProviderClient {
    const factory: AuthProviderClientFactory<UserPasswordAuthProviderClient>;
}
