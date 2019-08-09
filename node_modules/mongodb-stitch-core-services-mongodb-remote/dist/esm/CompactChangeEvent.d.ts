import { OperationType } from "./OperationType";
import UpdateDescription from "./UpdateDescription";
export default interface CompactChangeEvent<T> {
    readonly operationType: OperationType;
    readonly fullDocument?: T;
    readonly documentKey: object;
    readonly updateDescription?: UpdateDescription;
    readonly stitchDocumentVersion?: object;
    readonly stitchDocumentHash?: number;
}
