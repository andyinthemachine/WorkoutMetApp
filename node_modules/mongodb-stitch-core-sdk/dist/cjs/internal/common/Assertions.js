"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Assertions = (function () {
    function Assertions() {
    }
    Assertions.keyPresent = function (key, object) {
        if (object[key] === undefined) {
            throw new Error("expected " + key + " to be present");
        }
    };
    return Assertions;
}());
exports.default = Assertions;
//# sourceMappingURL=Assertions.js.map