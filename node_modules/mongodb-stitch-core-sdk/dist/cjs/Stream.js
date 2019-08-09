"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = __importDefault(require("./internal/net/Event"));
var StitchEvent_1 = __importDefault(require("./internal/net/StitchEvent"));
var Stream = (function () {
    function Stream(eventStream, decoder) {
        this.eventStream = eventStream;
        this.decoder = decoder;
        this.listeners = [];
    }
    Stream.prototype.next = function () {
        var _this = this;
        return this.eventStream.nextEvent()
            .then(function (event) {
            var se = StitchEvent_1.default.fromEvent(event, _this.decoder);
            if (se.eventName === StitchEvent_1.default.ERROR_EVENT_NAME) {
                throw se.error;
            }
            if (se.eventName === Event_1.default.MESSAGE_EVENT) {
                return se.data;
            }
            return _this.next();
        });
    };
    Stream.prototype.onNext = function (callback) {
        var _this = this;
        var wrapper = {
            onEvent: function (e) {
                var se = StitchEvent_1.default.fromEvent(e, _this.decoder);
                if (se.eventName !== Event_1.default.MESSAGE_EVENT) {
                    return;
                }
                callback(se.data);
            }
        };
        this.eventStream.addListener(wrapper);
    };
    Stream.prototype.onError = function (callback) {
        var _this = this;
        var wrapper = {
            onEvent: function (e) {
                var se = StitchEvent_1.default.fromEvent(e, _this.decoder);
                if (se.eventName === StitchEvent_1.default.ERROR_EVENT_NAME) {
                    callback(se.error);
                }
            }
        };
        this.eventStream.addListener(wrapper);
    };
    Stream.prototype.addListener = function (listener) {
        var _this = this;
        var wrapper = {
            onEvent: function (e) {
                var se = StitchEvent_1.default.fromEvent(e, _this.decoder);
                if (se.eventName === StitchEvent_1.default.ERROR_EVENT_NAME) {
                    if (listener.onError) {
                        listener.onError(se.error);
                    }
                }
                else {
                    if (listener.onNext) {
                        listener.onNext(se.data);
                    }
                }
            }
        };
        this.listeners.push([listener, wrapper]);
        this.eventStream.addListener(wrapper);
    };
    Stream.prototype.removeListener = function (listener) {
        var index = -1;
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i][0] === listener) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            return;
        }
        var wrapper = this.listeners[index][1];
        this.listeners.splice(index, 1);
        this.eventStream.removeListener(wrapper);
    };
    Stream.prototype.isOpen = function () {
        return this.eventStream.isOpen();
    };
    Stream.prototype.close = function () {
        this.eventStream.close();
    };
    return Stream;
}());
exports.default = Stream;
//# sourceMappingURL=Stream.js.map