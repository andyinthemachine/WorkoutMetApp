import RemoteMongoCollectionImpl from "./RemoteMongoCollectionImpl";
var RemoteMongoDatabaseImpl = (function () {
    function RemoteMongoDatabaseImpl(proxy) {
        this.proxy = proxy;
        this.name = this.proxy.name;
    }
    RemoteMongoDatabaseImpl.prototype.collection = function (name, codec) {
        return new RemoteMongoCollectionImpl(this.proxy.collection(name, codec));
    };
    return RemoteMongoDatabaseImpl;
}());
export default RemoteMongoDatabaseImpl;
//# sourceMappingURL=RemoteMongoDatabaseImpl.js.map