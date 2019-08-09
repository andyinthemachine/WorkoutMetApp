import { Decoder } from "./internal/common/Codec";
import EventStream from "./internal/net/EventStream";
import StreamListener from "./StreamListener";
export default class Stream<T> {
    private readonly eventStream;
    private readonly decoder?;
    private listeners;
    constructor(eventStream: EventStream, decoder?: Decoder<T>);
    next(): Promise<T>;
    onNext(callback: (data: T) => void): void;
    onError(callback: (error: Error) => void): void;
    addListener(listener: StreamListener<T>): void;
    removeListener(listener: StreamListener<T>): void;
    isOpen(): boolean;
    close(): void;
}
