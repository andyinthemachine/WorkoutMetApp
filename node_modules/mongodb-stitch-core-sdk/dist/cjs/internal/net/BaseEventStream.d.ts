import Event from "./Event";
import EventListener from "./EventListener";
import EventStream from "./EventStream";
export default abstract class BaseEventStream<T extends BaseEventStream<T>> implements EventStream {
    protected static readonly RETRY_TIMEOUT_MILLIS: number;
    protected closed: boolean;
    protected events: Event[];
    protected listeners: EventListener[];
    protected lastErr?: string;
    private readonly reconnecter?;
    constructor(reconnecter?: () => Promise<T>);
    isOpen(): boolean;
    abstract open(): void;
    addListener(listener: EventListener): void;
    removeListener(listener: EventListener): void;
    nextEvent(): Promise<Event>;
    close(): void;
    protected abstract afterClose(): void;
    protected abstract onReconnect(next: T): void;
    protected reconnect(error?: Error): void;
    protected poll(): void;
    private listenOnce;
}
