import BSON from "bson";
import Assertions from "../../../../internal/common/Assertions";
var Fields;
(function (Fields) {
    Fields["ID"] = "_id";
    Fields["KEY"] = "key";
    Fields["NAME"] = "name";
    Fields["DISABLED"] = "disabled";
})(Fields || (Fields = {}));
var UserApiKey = (function () {
    function UserApiKey(id, key, name, disabled) {
        this.id = BSON.ObjectID.createFromHexString(id);
        this.key = key;
        this.name = name;
        this.disabled = disabled;
    }
    UserApiKey.readFromApi = function (json) {
        var body = typeof json === "string" ? JSON.parse(json) : json;
        Assertions.keyPresent(Fields.ID, body);
        Assertions.keyPresent(Fields.NAME, body);
        Assertions.keyPresent(Fields.DISABLED, body);
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
export default UserApiKey;
//# sourceMappingURL=UserApiKey.js.map