"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RemoteMongoDatabaseImpl_1 = __importDefault(require("./RemoteMongoDatabaseImpl"));
var RemoteMongoClientImpl = (function () {
    function RemoteMongoClientImpl(proxy) {
        this.proxy = proxy;
    }
    RemoteMongoClientImpl.prototype.db = function (name) {
        return new RemoteMongoDatabaseImpl_1.default(this.proxy.db(name));
    };
    return RemoteMongoClientImpl;
}());
exports.default = RemoteMongoClientImpl;
//# sourceMappingURL=RemoteMongoClientImpl.js.map