"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CoreRemoteMongoCollectionImpl_1 = __importDefault(require("./CoreRemoteMongoCollectionImpl"));
var CoreRemoteMongoDatabaseImpl = (function () {
    function CoreRemoteMongoDatabaseImpl(name, service) {
        this.name = name;
        this.service = service;
    }
    CoreRemoteMongoDatabaseImpl.prototype.collection = function (name, codec) {
        return new CoreRemoteMongoCollectionImpl_1.default(name, this.name, this.service, codec);
    };
    return CoreRemoteMongoDatabaseImpl;
}());
exports.default = CoreRemoteMongoDatabaseImpl;
//# sourceMappingURL=CoreRemoteMongoDatabaseImpl.js.map