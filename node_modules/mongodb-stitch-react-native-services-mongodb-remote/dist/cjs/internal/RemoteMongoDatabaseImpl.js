"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RemoteMongoCollectionImpl_1 = __importDefault(require("./RemoteMongoCollectionImpl"));
var RemoteMongoDatabaseImpl = (function () {
    function RemoteMongoDatabaseImpl(proxy) {
        this.proxy = proxy;
        this.name = this.proxy.name;
    }
    RemoteMongoDatabaseImpl.prototype.collection = function (name, codec) {
        return new RemoteMongoCollectionImpl_1.default(this.proxy.collection(name, codec));
    };
    return RemoteMongoDatabaseImpl;
}());
exports.default = RemoteMongoDatabaseImpl;
//# sourceMappingURL=RemoteMongoDatabaseImpl.js.map