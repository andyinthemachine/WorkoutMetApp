import { BaseEventStream } from "mongodb-stitch-core-sdk";
export default class ReaderEventStream extends BaseEventStream<ReaderEventStream> {
    private readerStream;
    private reader;
    private dataBuffer;
    private eventName;
    private bufferPos;
    private buffer;
    private doneOnce;
    constructor(readerStream: ReadableStream, open: boolean, reconnecter?: () => Promise<ReaderEventStream>);
    open(): void;
    private reset;
    protected onReconnect(next: ReaderEventStream): void;
    private readLine;
    private processField;
    private dispatchEvent;
    private processLine;
    protected afterClose(): void;
}
