import RemoteMongoCursor from "./RemoteMongoCursor";
var RemoteMongoReadOperation = (function () {
    function RemoteMongoReadOperation(proxy) {
        this.proxy = proxy;
    }
    RemoteMongoReadOperation.prototype.first = function () {
        return this.proxy.first();
    };
    RemoteMongoReadOperation.prototype.toArray = function () {
        return this.proxy.toArray();
    };
    RemoteMongoReadOperation.prototype.asArray = function () {
        return this.toArray();
    };
    RemoteMongoReadOperation.prototype.iterator = function () {
        return this.proxy.iterator().then(function (res) { return new RemoteMongoCursor(res); });
    };
    return RemoteMongoReadOperation;
}());
export default RemoteMongoReadOperation;
//# sourceMappingURL=RemoteMongoReadOperation.js.map