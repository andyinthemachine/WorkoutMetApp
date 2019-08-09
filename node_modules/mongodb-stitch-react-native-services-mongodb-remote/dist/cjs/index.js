"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_stitch_core_services_mongodb_remote_1 = require("mongodb-stitch-core-services-mongodb-remote");
exports.RemoteInsertManyResult = mongodb_stitch_core_services_mongodb_remote_1.RemoteInsertManyResult;
var RemoteMongoClient_1 = require("./RemoteMongoClient");
exports.RemoteMongoClient = RemoteMongoClient_1.RemoteMongoClient;
var RemoteMongoReadOperation_1 = __importDefault(require("./RemoteMongoReadOperation"));
exports.RemoteMongoReadOperation = RemoteMongoReadOperation_1.default;
//# sourceMappingURL=index.js.map