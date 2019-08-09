import { CoreStitchServiceClient, StitchAppClientInfo } from "mongodb-stitch-core-sdk";
export default interface ServiceClientFactory<T> {
    getClient(service: CoreStitchServiceClient, client: StitchAppClientInfo): T;
}
