"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StitchClientConfiguration = (function () {
    function StitchClientConfiguration(baseUrl, storage, dataDirectory, transport) {
        this.baseUrl = baseUrl;
        this.storage = storage;
        this.dataDirectory = dataDirectory;
        this.transport = transport;
    }
    StitchClientConfiguration.prototype.builder = function () {
        return new StitchClientConfiguration.Builder(this);
    };
    return StitchClientConfiguration;
}());
exports.StitchClientConfiguration = StitchClientConfiguration;
(function (StitchClientConfiguration) {
    var Builder = (function () {
        function Builder(config) {
            if (config) {
                this.baseUrl = config.baseUrl;
                this.storage = config.storage;
                this.dataDirectory = config.dataDirectory;
                this.transport = config.transport;
            }
        }
        Builder.prototype.withBaseUrl = function (baseUrl) {
            this.baseUrl = baseUrl;
            return this;
        };
        Builder.prototype.withStorage = function (storage) {
            this.storage = storage;
            return this;
        };
        Builder.prototype.withDataDirectory = function (dataDirectory) {
            this.dataDirectory = dataDirectory;
            return this;
        };
        Builder.prototype.withTransport = function (transport) {
            this.transport = transport;
            return this;
        };
        Builder.prototype.build = function () {
            return new StitchClientConfiguration(this.baseUrl, this.storage, this.dataDirectory, this.transport);
        };
        return Builder;
    }());
    StitchClientConfiguration.Builder = Builder;
})(StitchClientConfiguration = exports.StitchClientConfiguration || (exports.StitchClientConfiguration = {}));
exports.StitchClientConfiguration = StitchClientConfiguration;
//# sourceMappingURL=StitchClientConfiguration.js.map