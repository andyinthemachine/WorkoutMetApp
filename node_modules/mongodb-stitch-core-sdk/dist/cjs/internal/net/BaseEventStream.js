"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StitchError_1 = __importDefault(require("../../StitchError"));
var StitchRequestError_1 = __importDefault(require("../../StitchRequestError"));
var Event_1 = __importDefault(require("./Event"));
var StitchEvent_1 = __importDefault(require("./StitchEvent"));
var BaseEventStream = (function () {
    function BaseEventStream(reconnecter) {
        this.reconnecter = reconnecter;
        this.closed = false;
        this.events = [];
        this.listeners = [];
        this.lastErr = undefined;
    }
    BaseEventStream.prototype.isOpen = function () {
        return !this.closed;
    };
    BaseEventStream.prototype.addListener = function (listener) {
        var _this = this;
        if (this.closed) {
            setTimeout(function () { return listener.onEvent(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed")); }, 0);
            return;
        }
        if (this.lastErr !== undefined) {
            setTimeout(function () { return listener.onEvent(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, _this.lastErr)); }, 0);
            return;
        }
        this.listeners.push(listener);
        this.poll();
    };
    BaseEventStream.prototype.removeListener = function (listener) {
        var index = this.listeners.indexOf(listener);
        if (index === -1) {
            return;
        }
        this.listeners.splice(index, 1);
    };
    BaseEventStream.prototype.nextEvent = function () {
        var _this = this;
        if (this.closed) {
            return Promise.reject(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed"));
        }
        if (this.lastErr !== undefined) {
            return Promise.reject(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, this.lastErr));
        }
        return new Promise(function (resolve, reject) {
            _this.listenOnce({
                onEvent: function (e) {
                    resolve(e);
                }
            });
        });
    };
    BaseEventStream.prototype.close = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        this.afterClose();
    };
    BaseEventStream.prototype.reconnect = function (error) {
        var _this = this;
        if (!this.reconnecter) {
            if (!this.closed) {
                this.closed = true;
                this.events.push(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed: " + error));
                this.poll();
            }
            return;
        }
        this.reconnecter()
            .then(function (next) {
            _this.onReconnect(next);
        })
            .catch(function (e) {
            if (!(e instanceof StitchError_1.default) || !(e instanceof StitchRequestError_1.default)) {
                _this.closed = true;
                _this.events.push(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed: " + error));
                _this.poll();
                return;
            }
            setTimeout(function () { return _this.reconnect(e); }, BaseEventStream.RETRY_TIMEOUT_MILLIS);
        });
    };
    BaseEventStream.prototype.poll = function () {
        var e_1, _a;
        while (this.events.length !== 0) {
            var event_1 = this.events.pop();
            try {
                for (var _b = __values(this.listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var listener = _c.value;
                    if (listener.onEvent) {
                        listener.onEvent(event_1);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    BaseEventStream.prototype.listenOnce = function (listener) {
        var _this = this;
        if (this.closed) {
            setTimeout(function () { return listener.onEvent(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, "stream closed")); }, 0);
            return;
        }
        if (this.lastErr !== undefined) {
            setTimeout(function () { return listener.onEvent(new Event_1.default(StitchEvent_1.default.ERROR_EVENT_NAME, _this.lastErr)); }, 0);
            return;
        }
        var wrapper = {
            onEvent: function (e) {
                _this.removeListener(wrapper);
                listener.onEvent(e);
            }
        };
        this.addListener(wrapper);
    };
    BaseEventStream.RETRY_TIMEOUT_MILLIS = 5000;
    return BaseEventStream;
}());
exports.default = BaseEventStream;
//# sourceMappingURL=BaseEventStream.js.map