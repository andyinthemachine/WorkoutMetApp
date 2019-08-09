import { CoreStitchServiceClient, StitchAppClientInfo } from "mongodb-stitch-core-sdk";
export default interface NamedServiceClientFactory<T> {
    getNamedClient(service: CoreStitchServiceClient, client: StitchAppClientInfo): T;
}
