import StitchServiceError from "../../StitchServiceError";
import { Decoder } from "../common/Codec";
import Event from "./Event";
export default class StitchEvent<T> {
    static readonly ERROR_EVENT_NAME: string;
    static fromEvent<T>(event: Event, decoder?: Decoder<T>): StitchEvent<T>;
    readonly eventName: string;
    readonly data: T;
    readonly error: StitchServiceError;
    private constructor();
}
