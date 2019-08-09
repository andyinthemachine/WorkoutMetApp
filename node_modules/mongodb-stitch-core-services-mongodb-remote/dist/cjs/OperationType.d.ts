export declare enum OperationType {
    Insert = "insert",
    Delete = "delete",
    Replace = "replace",
    Update = "update",
    Unknown = "unknown"
}
export declare function operationTypeFromRemote(type: string): OperationType;
