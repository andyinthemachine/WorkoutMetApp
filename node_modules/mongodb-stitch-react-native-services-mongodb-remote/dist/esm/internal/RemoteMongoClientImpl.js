import RemoteMongoDatabaseImpl from "./RemoteMongoDatabaseImpl";
var RemoteMongoClientImpl = (function () {
    function RemoteMongoClientImpl(proxy) {
        this.proxy = proxy;
    }
    RemoteMongoClientImpl.prototype.db = function (name) {
        return new RemoteMongoDatabaseImpl(this.proxy.db(name));
    };
    return RemoteMongoClientImpl;
}());
export default RemoteMongoClientImpl;
//# sourceMappingURL=RemoteMongoClientImpl.js.map