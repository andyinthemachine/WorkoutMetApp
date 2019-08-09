var RemoteMongoCursor = (function () {
    function RemoteMongoCursor(proxy) {
        this.proxy = proxy;
    }
    RemoteMongoCursor.prototype.next = function () {
        return Promise.resolve(this.proxy.next().value);
    };
    return RemoteMongoCursor;
}());
export default RemoteMongoCursor;
//# sourceMappingURL=RemoteMongoCursor.js.map