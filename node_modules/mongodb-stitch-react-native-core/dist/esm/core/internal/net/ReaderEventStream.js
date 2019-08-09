var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Event, BaseEventStream, utf8Slice, StitchEvent, StitchClientError, StitchClientErrorCode } from "mongodb-stitch-core-sdk";
var ReaderEventStream = (function (_super) {
    __extends(ReaderEventStream, _super);
    function ReaderEventStream(readerStream, open, reconnecter) {
        var _this = _super.call(this, reconnecter) || this;
        _this.readerStream = readerStream;
        if (open) {
            _this.reset();
        }
        return _this;
    }
    ReaderEventStream.prototype.open = function () {
        if (this.closed) {
            throw new StitchClientError(StitchClientErrorCode.StreamClosed);
        }
        this.reset();
    };
    ReaderEventStream.prototype.reset = function () {
        this.reader = this.readerStream.getReader();
        this.dataBuffer = new Array();
        this.eventName = "";
        this.bufferPos = 0;
        this.buffer = new Array();
        this.doneOnce = false;
        this.processLine();
    };
    ReaderEventStream.prototype.onReconnect = function (next) {
        this.readerStream = next.readerStream;
        this.reset();
    };
    ReaderEventStream.prototype.readLine = function () {
        var _this = this;
        for (; this.bufferPos < this.buffer.length; this.bufferPos++) {
            var spliceAt = -1;
            if (this.buffer[this.bufferPos] === 0x0D && this.bufferPos + 1 > this.buffer.length && this.buffer[this.bufferPos] === 0x0A) {
                spliceAt = this.bufferPos + 2;
            }
            else if (this.buffer[this.bufferPos] === 0x0A) {
                spliceAt = this.bufferPos + 1;
            }
            else if (this.doneOnce && this.buffer[this.bufferPos] === 0x0D) {
                spliceAt = this.bufferPos + 1;
            }
            else if (this.doneOnce) {
                spliceAt = 0;
            }
            if (spliceAt !== -1) {
                var line = utf8Slice(new Uint8Array(this.buffer.slice(0, this.bufferPos)), 0, this.bufferPos);
                this.buffer.splice(0, spliceAt);
                this.bufferPos = 0;
                return Promise.resolve({ line: line, ok: true });
            }
        }
        if (this.doneOnce) {
            return Promise.resolve({ line: "", ok: false });
        }
        return this.reader.read().then(function (result) {
            if (result.done) {
                _this.doneOnce = true;
                return _this.readLine();
            }
            var bytes = result.value;
            for (var idx = 0; idx < bytes.length; idx++) {
                _this.buffer.push(bytes[idx]);
            }
            return _this.readLine();
        });
    };
    ReaderEventStream.prototype.processField = function (field, value) {
        if (field === "event") {
            this.eventName = value;
        }
        else if (field === "data") {
            if (this.dataBuffer.length !== 0) {
                this.dataBuffer.push('\n');
            }
            for (var i = 0; i < value.length; i++) {
                this.dataBuffer.push(value[i]);
            }
        }
        else if (field === "id") {
        }
        else if (field === "retry") {
        }
        else {
        }
    };
    ReaderEventStream.prototype.dispatchEvent = function () {
        if (this.dataBuffer.length === 0) {
            this.eventName = "";
            return;
        }
        var event = new Event(this.eventName ? this.eventName : Event.MESSAGE_EVENT, this.dataBuffer.join(''));
        this.dataBuffer = new Array();
        this.eventName = "";
        if (event.eventName === StitchEvent.ERROR_EVENT_NAME) {
            this.lastErr = event.data;
            this.close();
        }
        this.events.push(event);
        this.poll();
    };
    ReaderEventStream.prototype.processLine = function () {
        var _this = this;
        this.readLine().then(function (result) {
            if (!result.ok) {
                if (_this.closed) {
                    return;
                }
                _this.reconnect();
                return;
            }
            var line = result.line;
            if (line.length === 0) {
                _this.dispatchEvent();
            }
            else if (line.startsWith(":")) {
            }
            else if (line.includes(":")) {
                var colonIdx = line.indexOf(":");
                var field = line.substring(0, colonIdx);
                var value = line.substring(colonIdx + 1);
                value = value.startsWith(" ") ? value.substring(1) : value;
                _this.processField(field, value);
            }
            else {
                _this.processField(line, "");
            }
            _this.processLine();
        }).catch(function (error) { return _this.reconnect(error); });
    };
    ReaderEventStream.prototype.afterClose = function () {
        this.reader.cancel();
    };
    return ReaderEventStream;
}(BaseEventStream));
export default ReaderEventStream;
//# sourceMappingURL=ReaderEventStream.js.map