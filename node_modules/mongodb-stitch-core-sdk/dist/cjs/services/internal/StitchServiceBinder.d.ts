import { RebindEvent } from "./RebindEvent";
export default interface StitchServiceBinder {
    onRebindEvent(rebindEvent: RebindEvent): any;
}
