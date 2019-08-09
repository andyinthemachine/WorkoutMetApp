import StitchError from "./StitchError";
import { StitchRequestErrorCode } from "./StitchRequestErrorCode";
export default class StitchRequestError extends StitchError {
    readonly errorCode: StitchRequestErrorCode;
    readonly errorCodeName: string;
    readonly underlyingError: Error;
    constructor(underlyingError: Error, errorCode: StitchRequestErrorCode);
}
