import BSON from "bson";
import StitchAuthRequestClient from "../../../auth/internal/StitchAuthRequestClient";
import { StitchAuthRoutes } from "../../../auth/internal/StitchAuthRoutes";
import CoreAuthProviderClient from "../internal/CoreAuthProviderClient";
import UserApiKey from "./models/UserApiKey";
export default class CoreUserApiKeyAuthProviderClient extends CoreAuthProviderClient<StitchAuthRequestClient> {
    constructor(requestClient: StitchAuthRequestClient, authRoutes: StitchAuthRoutes);
    createApiKey(name: string): Promise<UserApiKey>;
    fetchApiKey(keyId: BSON.ObjectID): Promise<UserApiKey>;
    fetchApiKeys(): Promise<UserApiKey[]>;
    deleteApiKey(keyId: BSON.ObjectID): Promise<void>;
    enableApiKey(keyId: BSON.ObjectID): Promise<void>;
    disableApiKey(keyId: BSON.ObjectID): Promise<void>;
    private getApiKeyRoute;
    private getApiKeyEnableRoute;
    private getApiKeyDisableRoute;
}
