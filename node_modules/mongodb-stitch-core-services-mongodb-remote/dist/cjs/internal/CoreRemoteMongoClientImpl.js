"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CoreRemoteMongoDatabaseImpl_1 = __importDefault(require("./CoreRemoteMongoDatabaseImpl"));
var CoreRemoteMongoClientImpl = (function () {
    function CoreRemoteMongoClientImpl(service) {
        this.service = service;
    }
    CoreRemoteMongoClientImpl.prototype.db = function (name) {
        return new CoreRemoteMongoDatabaseImpl_1.default(name, this.service);
    };
    return CoreRemoteMongoClientImpl;
}());
exports.default = CoreRemoteMongoClientImpl;
//# sourceMappingURL=CoreRemoteMongoClientImpl.js.map