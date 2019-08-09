import StitchAuthRequestClient from "../auth/internal/StitchAuthRequestClient";
import { Decoder } from "../internal/common/Codec";
import StitchAppRoutes from "../internal/net/StitchAppRoutes";
export default class CoreStitchAppClient {
    private readonly functionService;
    constructor(authRequestClient: StitchAuthRequestClient, routes: StitchAppRoutes);
    callFunction<T>(name: string, args: any[], decoder?: Decoder<T>): Promise<T>;
}
