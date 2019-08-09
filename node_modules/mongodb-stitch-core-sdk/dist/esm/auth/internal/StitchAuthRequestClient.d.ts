import { Decoder } from "../../internal/common/Codec";
import Response from "../../internal/net/Response";
import { StitchAuthRequest } from "../../internal/net/StitchAuthRequest";
import Stream from "../../Stream";
export default interface StitchAuthRequestClient {
    doAuthenticatedRequest(stitchReq: StitchAuthRequest): Promise<Response>;
    doAuthenticatedRequestWithDecoder<T>(stitchReq: StitchAuthRequest, decoder?: Decoder<T>): Promise<T>;
    openAuthenticatedStreamWithDecoder<T>(stitchReq: StitchAuthRequest, decoder?: Decoder<T>): Promise<Stream<T>>;
}
