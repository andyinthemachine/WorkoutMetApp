"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_stitch_core_services_mongodb_remote_1 = require("mongodb-stitch-core-services-mongodb-remote");
var RemoteMongoClientImpl_1 = __importDefault(require("./internal/RemoteMongoClientImpl"));
var RemoteMongoClient;
(function (RemoteMongoClient) {
    RemoteMongoClient.factory = new (function () {
        function class_1() {
        }
        class_1.prototype.getNamedClient = function (service, client) {
            return new RemoteMongoClientImpl_1.default(new mongodb_stitch_core_services_mongodb_remote_1.CoreRemoteMongoClientImpl(service));
        };
        return class_1;
    }())();
})(RemoteMongoClient = exports.RemoteMongoClient || (exports.RemoteMongoClient = {}));
//# sourceMappingURL=RemoteMongoClient.js.map