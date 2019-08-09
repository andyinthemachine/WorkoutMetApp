export default interface StreamListener<T> {
    onNext(data: T): void;
    onError(error: Error): void;
}
