"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
var OperationType_1 = require("../OperationType");
var RemoteInsertManyResult_1 = __importDefault(require("../RemoteInsertManyResult"));
var RemoteInsertManyResultFields;
(function (RemoteInsertManyResultFields) {
    RemoteInsertManyResultFields["InsertedIds"] = "insertedIds";
})(RemoteInsertManyResultFields || (RemoteInsertManyResultFields = {}));
var RemoteInsertOneResultFields;
(function (RemoteInsertOneResultFields) {
    RemoteInsertOneResultFields["InsertedId"] = "insertedId";
})(RemoteInsertOneResultFields || (RemoteInsertOneResultFields = {}));
var RemoteUpdateResultFields;
(function (RemoteUpdateResultFields) {
    RemoteUpdateResultFields["MatchedCount"] = "matchedCount";
    RemoteUpdateResultFields["ModifiedCount"] = "modifiedCount";
    RemoteUpdateResultFields["UpsertedId"] = "upsertedId";
})(RemoteUpdateResultFields || (RemoteUpdateResultFields = {}));
var RemoteDeleteResultFields;
(function (RemoteDeleteResultFields) {
    RemoteDeleteResultFields["DeletedCount"] = "deletedCount";
})(RemoteDeleteResultFields || (RemoteDeleteResultFields = {}));
var UpdateDescriptionFields;
(function (UpdateDescriptionFields) {
    UpdateDescriptionFields["UpdatedFields"] = "updatedFields";
    UpdateDescriptionFields["RemovedFields"] = "removedFields";
})(UpdateDescriptionFields || (UpdateDescriptionFields = {}));
var ChangeEventFields;
(function (ChangeEventFields) {
    ChangeEventFields["Id"] = "_id";
    ChangeEventFields["OperationType"] = "operationType";
    ChangeEventFields["FullDocument"] = "fullDocument";
    ChangeEventFields["DocumentKey"] = "documentKey";
    ChangeEventFields["Namespace"] = "ns";
    ChangeEventFields["NamespaceDb"] = "db";
    ChangeEventFields["NamespaceColl"] = "coll";
    ChangeEventFields["UpdateDescription"] = "updateDescription";
})(ChangeEventFields || (ChangeEventFields = {}));
var CompactChangeEventFields;
(function (CompactChangeEventFields) {
    CompactChangeEventFields["OperationType"] = "ot";
    CompactChangeEventFields["FullDocument"] = "fd";
    CompactChangeEventFields["DocumentKey"] = "dk";
    CompactChangeEventFields["UpdateDescription"] = "ud";
    CompactChangeEventFields["StitchDocumentVersion"] = "sdv";
    CompactChangeEventFields["StitchDocumentHash"] = "sdh";
})(CompactChangeEventFields || (CompactChangeEventFields = {}));
var RemoteInsertManyResultDecoder = (function () {
    function RemoteInsertManyResultDecoder() {
    }
    RemoteInsertManyResultDecoder.prototype.decode = function (from) {
        return new RemoteInsertManyResult_1.default(from[RemoteInsertManyResultFields.InsertedIds]);
    };
    return RemoteInsertManyResultDecoder;
}());
var RemoteInsertOneResultDecoder = (function () {
    function RemoteInsertOneResultDecoder() {
    }
    RemoteInsertOneResultDecoder.prototype.decode = function (from) {
        return {
            insertedId: from[RemoteInsertOneResultFields.InsertedId]
        };
    };
    return RemoteInsertOneResultDecoder;
}());
var RemoteUpdateResultDecoder = (function () {
    function RemoteUpdateResultDecoder() {
    }
    RemoteUpdateResultDecoder.prototype.decode = function (from) {
        return {
            matchedCount: from[RemoteUpdateResultFields.MatchedCount],
            modifiedCount: from[RemoteUpdateResultFields.ModifiedCount],
            upsertedId: from[RemoteUpdateResultFields.UpsertedId]
        };
    };
    return RemoteUpdateResultDecoder;
}());
var RemoteDeleteResultDecoder = (function () {
    function RemoteDeleteResultDecoder() {
    }
    RemoteDeleteResultDecoder.prototype.decode = function (from) {
        return {
            deletedCount: from[RemoteDeleteResultFields.DeletedCount]
        };
    };
    return RemoteDeleteResultDecoder;
}());
var UpdateDescriptionDecoder = (function () {
    function UpdateDescriptionDecoder() {
    }
    UpdateDescriptionDecoder.prototype.decode = function (from) {
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(UpdateDescriptionFields.UpdatedFields, from);
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(UpdateDescriptionFields.RemovedFields, from);
        return {
            removedFields: from[UpdateDescriptionFields.RemovedFields],
            updatedFields: from[UpdateDescriptionFields.UpdatedFields],
        };
    };
    return UpdateDescriptionDecoder;
}());
function decodeBaseChangeEventFields(from, updateDescriptionField, fullDocumentField, decoder) {
    var updateDescription;
    if (updateDescriptionField in from) {
        updateDescription = ResultDecoders.updateDescriptionDecoder.decode(from[updateDescriptionField]);
    }
    else {
        updateDescription = undefined;
    }
    var fullDocument;
    if (fullDocumentField in from) {
        fullDocument = from[fullDocumentField];
        if (decoder) {
            fullDocument = decoder.decode(fullDocument);
        }
    }
    else {
        fullDocument = undefined;
    }
    return { updateDescription: updateDescription, fullDocument: fullDocument };
}
var ChangeEventDecoder = (function () {
    function ChangeEventDecoder(decoder) {
        this.decoder = decoder;
    }
    ChangeEventDecoder.prototype.decode = function (from) {
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.Id, from);
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.OperationType, from);
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.Namespace, from);
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(ChangeEventFields.DocumentKey, from);
        var nsDoc = from[ChangeEventFields.Namespace];
        var _a = decodeBaseChangeEventFields(from, ChangeEventFields.UpdateDescription, ChangeEventFields.FullDocument, this.decoder), updateDescription = _a.updateDescription, fullDocument = _a.fullDocument;
        return {
            documentKey: from[ChangeEventFields.DocumentKey],
            fullDocument: fullDocument,
            id: from[ChangeEventFields.Id],
            namespace: {
                collection: nsDoc[ChangeEventFields.NamespaceColl],
                database: nsDoc[ChangeEventFields.NamespaceDb]
            },
            operationType: OperationType_1.operationTypeFromRemote(from[ChangeEventFields.OperationType]),
            updateDescription: updateDescription
        };
    };
    return ChangeEventDecoder;
}());
var CompactChangeEventDecoder = (function () {
    function CompactChangeEventDecoder(decoder) {
        this.decoder = decoder;
    }
    CompactChangeEventDecoder.prototype.decode = function (from) {
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(CompactChangeEventFields.OperationType, from);
        mongodb_stitch_core_sdk_1.Assertions.keyPresent(CompactChangeEventFields.DocumentKey, from);
        var _a = decodeBaseChangeEventFields(from, CompactChangeEventFields.UpdateDescription, CompactChangeEventFields.FullDocument, this.decoder), updateDescription = _a.updateDescription, fullDocument = _a.fullDocument;
        var stitchDocumentVersion;
        if (CompactChangeEventFields.StitchDocumentVersion in from) {
            stitchDocumentVersion = from[CompactChangeEventFields.StitchDocumentVersion];
        }
        else {
            stitchDocumentVersion = undefined;
        }
        var stitchDocumentHash;
        if (CompactChangeEventFields.StitchDocumentHash in from) {
            stitchDocumentHash = from[CompactChangeEventFields.StitchDocumentHash];
        }
        else {
            stitchDocumentHash = undefined;
        }
        return {
            documentKey: from[CompactChangeEventFields.DocumentKey],
            fullDocument: fullDocument,
            operationType: OperationType_1.operationTypeFromRemote(from[CompactChangeEventFields.OperationType]),
            stitchDocumentHash: stitchDocumentHash,
            stitchDocumentVersion: stitchDocumentVersion,
            updateDescription: updateDescription,
        };
    };
    return CompactChangeEventDecoder;
}());
var ResultDecoders = (function () {
    function ResultDecoders() {
    }
    ResultDecoders.remoteInsertManyResultDecoder = new RemoteInsertManyResultDecoder();
    ResultDecoders.remoteInsertOneResultDecoder = new RemoteInsertOneResultDecoder();
    ResultDecoders.remoteUpdateResultDecoder = new RemoteUpdateResultDecoder();
    ResultDecoders.remoteDeleteResultDecoder = new RemoteDeleteResultDecoder();
    ResultDecoders.updateDescriptionDecoder = new UpdateDescriptionDecoder();
    ResultDecoders.ChangeEventDecoder = ChangeEventDecoder;
    ResultDecoders.CompactChangeEventDecoder = CompactChangeEventDecoder;
    return ResultDecoders;
}());
exports.default = ResultDecoders;
//# sourceMappingURL=ResultDecoders.js.map