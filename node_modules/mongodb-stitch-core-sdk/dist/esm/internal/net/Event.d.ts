export default class Event {
    static readonly MESSAGE_EVENT: string;
    readonly eventName: string;
    readonly data: string;
    constructor(eventName: string, data: string);
}
