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
export default RemoteInsertManyResult;
//# sourceMappingURL=RemoteInsertManyResult.js.map