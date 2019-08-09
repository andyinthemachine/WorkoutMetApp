import { AuthEvent, CoreStitchUser } from "../..";
import { RebindEvent, RebindEventType } from "./RebindEvent";
export default class AuthRebindEvent<TStitchUser extends CoreStitchUser> extends RebindEvent {
    type: RebindEventType;
    event: AuthEvent<TStitchUser>;
    constructor(event: AuthEvent<TStitchUser>);
}
