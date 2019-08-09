var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import BSON from "bson";
import CoreRemoteMongoReadOperation from "./CoreRemoteMongoReadOperation";
import ResultDecoders from "./ResultDecoders";
var CoreRemoteMongoCollectionImpl = (function () {
    function CoreRemoteMongoCollectionImpl(name, databaseName, service, codec) {
        var _this = this;
        this.name = name;
        this.databaseName = databaseName;
        this.service = service;
        this.codec = codec;
        this.namespace = this.databaseName + "." + this.name;
        this.baseOperationArgs = (function () { return ({
            collection: _this.name,
            database: _this.databaseName
        }); })();
    }
    CoreRemoteMongoCollectionImpl.prototype.withCollectionType = function (codec) {
        return new CoreRemoteMongoCollectionImpl(this.name, this.databaseName, this.service, codec);
    };
    CoreRemoteMongoCollectionImpl.prototype.find = function (filter, options) {
        if (filter === void 0) { filter = {}; }
        var args = __assign({}, this.baseOperationArgs);
        args.query = filter;
        if (options) {
            if (options.limit) {
                args.limit = options.limit;
            }
            if (options.projection) {
                args.project = options.projection;
            }
            if (options.sort) {
                args.sort = options.sort;
            }
        }
        return new CoreRemoteMongoReadOperation("find", args, this.service, this.codec);
    };
    CoreRemoteMongoCollectionImpl.prototype.findOne = function (filter, options) {
        if (filter === void 0) { filter = {}; }
        var args = __assign({}, this.baseOperationArgs);
        args.query = filter;
        if (options) {
            if (options.projection) {
                args.project = options.projection;
            }
            if (options.sort) {
                args.sort = options.sort;
            }
        }
        return this.service.callFunction("findOne", [args], this.codec);
    };
    CoreRemoteMongoCollectionImpl.prototype.findOneAndUpdate = function (filter, update, options) {
        var args = __assign({}, this.baseOperationArgs);
        args.filter = filter;
        args.update = update;
        if (options) {
            if (options.projection) {
                args.projection = options.projection;
            }
            if (options.sort) {
                args.sort = options.sort;
            }
            if (options.upsert) {
                args.upsert = true;
            }
            if (options.returnNewDocument) {
                args.returnNewDocument = true;
            }
        }
        return this.service.callFunction("findOneAndUpdate", [args], this.codec);
    };
    CoreRemoteMongoCollectionImpl.prototype.findOneAndReplace = function (filter, replacement, options) {
        var args = __assign({}, this.baseOperationArgs);
        args.filter = filter;
        args.update = replacement;
        if (options) {
            if (options.projection) {
                args.projection = options.projection;
            }
            if (options.sort) {
                args.sort = options.sort;
            }
            if (options.upsert) {
                args.upsert = true;
            }
            if (options.returnNewDocument) {
                args.returnNewDocument = true;
            }
        }
        return this.service.callFunction("findOneAndReplace", [args], this.codec);
    };
    CoreRemoteMongoCollectionImpl.prototype.findOneAndDelete = function (filter, options) {
        var args = __assign({}, this.baseOperationArgs);
        args.filter = filter;
        if (options) {
            if (options.projection) {
                args.projection = options.projection;
            }
            if (options.sort) {
                args.sort = options.sort;
            }
        }
        return this.service.callFunction("findOneAndDelete", [args], this.codec);
    };
    CoreRemoteMongoCollectionImpl.prototype.aggregate = function (pipeline) {
        var args = __assign({}, this.baseOperationArgs);
        args.pipeline = pipeline;
        return new CoreRemoteMongoReadOperation("aggregate", args, this.service, this.codec);
    };
    CoreRemoteMongoCollectionImpl.prototype.count = function (query, options) {
        if (query === void 0) { query = {}; }
        var args = __assign({}, this.baseOperationArgs);
        args.query = query;
        if (options && options.limit) {
            args.limit = options.limit;
        }
        return this.service.callFunction("count", [args]);
    };
    CoreRemoteMongoCollectionImpl.prototype.insertOne = function (value) {
        var args = __assign({}, this.baseOperationArgs);
        args.document = this.generateObjectIdIfMissing(this.codec ? this.codec.encode(value) : value);
        return this.service.callFunction("insertOne", [args], ResultDecoders.remoteInsertOneResultDecoder);
    };
    CoreRemoteMongoCollectionImpl.prototype.insertMany = function (docs) {
        var _this = this;
        var args = __assign({}, this.baseOperationArgs);
        args.documents = docs.map(function (doc) {
            return _this.generateObjectIdIfMissing(_this.codec ? _this.codec.encode(doc) : doc);
        });
        return this.service.callFunction("insertMany", [args], ResultDecoders.remoteInsertManyResultDecoder);
    };
    CoreRemoteMongoCollectionImpl.prototype.deleteOne = function (query) {
        return this.executeDelete(query, false);
    };
    CoreRemoteMongoCollectionImpl.prototype.deleteMany = function (query) {
        return this.executeDelete(query, true);
    };
    CoreRemoteMongoCollectionImpl.prototype.updateOne = function (query, update, options) {
        return this.executeUpdate(query, update, options, false);
    };
    CoreRemoteMongoCollectionImpl.prototype.updateMany = function (query, update, options) {
        return this.executeUpdate(query, update, options, true);
    };
    CoreRemoteMongoCollectionImpl.prototype.watch = function (arg) {
        var args = __assign({}, this.baseOperationArgs);
        if (arg !== undefined) {
            if (arg instanceof Array) {
                if (arg.length !== 0) {
                    args.ids = arg;
                }
            }
            else if (arg instanceof Object) {
                args.filter = arg;
            }
        }
        args.useCompactEvents = false;
        return this.service.streamFunction("watch", [args], new ResultDecoders.ChangeEventDecoder(this.codec));
    };
    CoreRemoteMongoCollectionImpl.prototype.watchCompact = function (ids) {
        var args = __assign({}, this.baseOperationArgs);
        args.ids = ids;
        args.useCompactEvents = true;
        return this.service.streamFunction("watch", [args], new ResultDecoders.CompactChangeEventDecoder(this.codec));
    };
    CoreRemoteMongoCollectionImpl.prototype.executeDelete = function (query, multi) {
        var args = __assign({}, this.baseOperationArgs);
        args.query = query;
        return this.service.callFunction(multi ? "deleteMany" : "deleteOne", [args], ResultDecoders.remoteDeleteResultDecoder);
    };
    CoreRemoteMongoCollectionImpl.prototype.executeUpdate = function (query, update, options, multi) {
        if (multi === void 0) { multi = false; }
        var args = __assign({}, this.baseOperationArgs);
        args.query = query;
        args.update = update;
        if (options && options.upsert) {
            args.upsert = options.upsert;
        }
        return this.service.callFunction(multi ? "updateMany" : "updateOne", [args], ResultDecoders.remoteUpdateResultDecoder);
    };
    CoreRemoteMongoCollectionImpl.prototype.generateObjectIdIfMissing = function (doc) {
        if (!doc._id) {
            var newDoc = doc;
            newDoc._id = new BSON.ObjectID();
            return newDoc;
        }
        return doc;
    };
    return CoreRemoteMongoCollectionImpl;
}());
export default CoreRemoteMongoCollectionImpl;
//# sourceMappingURL=CoreRemoteMongoCollectionImpl.js.map