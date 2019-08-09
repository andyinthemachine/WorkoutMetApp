interface Storage {
    get(key: string): string;
    set(key: string, value: string): any;
    remove(key: string): any;
}
declare class MemoryStorage implements Storage {
    private readonly suiteName;
    private readonly storage;
    constructor(suiteName: string);
    get(key: string): string;
    set(key: string, value: string): void;
    remove(key: string): void;
}
export { Storage, MemoryStorage };
