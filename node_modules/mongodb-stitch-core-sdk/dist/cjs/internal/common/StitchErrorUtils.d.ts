import StitchError from "../../StitchError";
import Response from "../net/Response";
export declare function wrapDecodingError(err: any): StitchError;
export declare function handleRequestError(response: Response): never;
