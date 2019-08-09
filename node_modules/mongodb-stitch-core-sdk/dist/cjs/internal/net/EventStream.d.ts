import Event from "./Event";
import EventListener from "./EventListener";
export default interface EventStream {
    nextEvent(): Promise<Event>;
    addListener(listener: EventListener): void;
    removeListener(listener: EventListener): void;
    isOpen(): boolean;
    open(): void;
    close(): void;
}
