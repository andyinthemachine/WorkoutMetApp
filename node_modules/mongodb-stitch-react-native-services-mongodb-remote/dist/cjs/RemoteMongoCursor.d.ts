export default class RemoteMongoCursor<T> {
    private readonly proxy;
    constructor(proxy: Iterator<T>);
    next(): Promise<T | undefined>;
}
