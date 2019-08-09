import MongoNamespace from "./MongoNamespace";
import { OperationType } from "./OperationType";
import UpdateDescription from "./UpdateDescription";
export default interface ChangeEvent<T> {
    readonly id: object;
    readonly operationType: OperationType;
    readonly fullDocument?: T;
    readonly namespace: MongoNamespace;
    readonly documentKey: object;
    readonly updateDescription?: UpdateDescription;
}
