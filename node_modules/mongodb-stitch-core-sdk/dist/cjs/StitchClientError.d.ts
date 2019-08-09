import { StitchClientErrorCode } from "./StitchClientErrorCode";
import StitchError from "./StitchError";
export default class StitchClientError extends StitchError {
    readonly errorCode: StitchClientErrorCode;
    readonly errorCodeName: string;
    constructor(errorCode: StitchClientErrorCode);
}
