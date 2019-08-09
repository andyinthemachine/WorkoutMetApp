import StitchError from "./StitchError";
import { StitchServiceErrorCode } from "./StitchServiceErrorCode";
export default class StitchServiceError extends StitchError {
    readonly errorCode: StitchServiceErrorCode;
    readonly errorCodeName: string;
    readonly message: string;
    constructor(message: string, errorCode?: StitchServiceErrorCode);
}
