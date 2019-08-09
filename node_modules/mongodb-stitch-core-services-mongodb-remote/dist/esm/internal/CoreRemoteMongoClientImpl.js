import CoreRemoteMongoDatabaseImpl from "./CoreRemoteMongoDatabaseImpl";
var CoreRemoteMongoClientImpl = (function () {
    function CoreRemoteMongoClientImpl(service) {
        this.service = service;
    }
    CoreRemoteMongoClientImpl.prototype.db = function (name) {
        return new CoreRemoteMongoDatabaseImpl(name, this.service);
    };
    return CoreRemoteMongoClientImpl;
}());
export default CoreRemoteMongoClientImpl;
//# sourceMappingURL=CoreRemoteMongoClientImpl.js.map