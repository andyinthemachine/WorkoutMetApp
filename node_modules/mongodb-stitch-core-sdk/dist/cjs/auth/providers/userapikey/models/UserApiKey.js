"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bson_1 = __importDefault(require("bson"));
var Assertions_1 = __importDefault(require("../../../../internal/common/Assertions"));
var Fields;
(function (Fields) {
    Fields["ID"] = "_id";
    Fields["KEY"] = "key";
    Fields["NAME"] = "name";
    Fields["DISABLED"] = "disabled";
})(Fields || (Fields = {}));
var UserApiKey = (function () {
    function UserApiKey(id, key, name, disabled) {
        this.id = bson_1.default.ObjectID.createFromHexString(id);
        this.key = key;
        this.name = name;
        this.disabled = disabled;
    }
    UserApiKey.readFromApi = function (json) {
        var body = typeof json === "string" ? JSON.parse(json) : json;
        Assertions_1.default.keyPresent(Fields.ID, body);
        Assertions_1.default.keyPresent(Fields.NAME, body);
        Assertions_1.default.keyPresent(Fields.DISABLED, body);
        return new UserApiKey(body[Fields.ID], body[Fields.KEY], body[Fields.NAME], body[Fields.DISABLED]);
    };
    UserApiKey.prototype.toJSON = function () {
        var _a;
        return _a = {},
            _a[Fields.ID] = this.id,
            _a[Fields.KEY] = this.key,
            _a[Fields.NAME] = this.name,
            _a[Fields.DISABLED] = this.disabled,
            _a;
    };
    return UserApiKey;
}());
exports.default = UserApiKey;
//# sourceMappingURL=UserApiKey.js.map