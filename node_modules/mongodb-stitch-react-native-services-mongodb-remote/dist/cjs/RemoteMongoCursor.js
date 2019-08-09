"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RemoteMongoCursor = (function () {
    function RemoteMongoCursor(proxy) {
        this.proxy = proxy;
    }
    RemoteMongoCursor.prototype.next = function () {
        return Promise.resolve(this.proxy.next().value);
    };
    return RemoteMongoCursor;
}());
exports.default = RemoteMongoCursor;
//# sourceMappingURL=RemoteMongoCursor.js.map