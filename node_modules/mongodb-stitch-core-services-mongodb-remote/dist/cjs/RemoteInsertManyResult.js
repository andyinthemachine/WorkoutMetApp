"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RemoteInsertManyResult = (function () {
    function RemoteInsertManyResult(arr) {
        var inserted = {};
        arr.forEach(function (value, index) {
            inserted[index] = value;
        });
        this.insertedIds = inserted;
    }
    return RemoteInsertManyResult;
}());
exports.default = RemoteInsertManyResult;
//# sourceMappingURL=RemoteInsertManyResult.js.map