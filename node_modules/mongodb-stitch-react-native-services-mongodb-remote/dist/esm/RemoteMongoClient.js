import { CoreRemoteMongoClientImpl } from "mongodb-stitch-core-services-mongodb-remote";
import RemoteMongoClientImpl from "./internal/RemoteMongoClientImpl";
export var RemoteMongoClient;
(function (RemoteMongoClient) {
    RemoteMongoClient.factory = new (function () {
        function class_1() {
        }
        class_1.prototype.getNamedClient = function (service, client) {
            return new RemoteMongoClientImpl(new CoreRemoteMongoClientImpl(service));
        };
        return class_1;
    }())();
})(RemoteMongoClient || (RemoteMongoClient = {}));
//# sourceMappingURL=RemoteMongoClient.js.map