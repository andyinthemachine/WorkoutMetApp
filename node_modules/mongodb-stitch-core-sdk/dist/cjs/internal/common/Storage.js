"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryStorage = (function () {
    function MemoryStorage(suiteName) {
        this.suiteName = suiteName;
        this.storage = {};
    }
    MemoryStorage.prototype.get = function (key) {
        return this.storage[this.suiteName + "." + key];
    };
    MemoryStorage.prototype.set = function (key, value) {
        this.storage[this.suiteName + "." + key] = value;
    };
    MemoryStorage.prototype.remove = function (key) {
        delete this.storage[this.suiteName + "." + key];
    };
    return MemoryStorage;
}());
exports.MemoryStorage = MemoryStorage;
//# sourceMappingURL=Storage.js.map