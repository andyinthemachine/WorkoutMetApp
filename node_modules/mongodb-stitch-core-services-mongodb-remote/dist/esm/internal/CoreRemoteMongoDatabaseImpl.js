import CoreRemoteMongoCollectionImpl from "./CoreRemoteMongoCollectionImpl";
var CoreRemoteMongoDatabaseImpl = (function () {
    function CoreRemoteMongoDatabaseImpl(name, service) {
        this.name = name;
        this.service = service;
    }
    CoreRemoteMongoDatabaseImpl.prototype.collection = function (name, codec) {
        return new CoreRemoteMongoCollectionImpl(name, this.name, this.service, codec);
    };
    return CoreRemoteMongoDatabaseImpl;
}());
export default CoreRemoteMongoDatabaseImpl;
//# sourceMappingURL=CoreRemoteMongoDatabaseImpl.js.map