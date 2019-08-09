import { EJSON } from 'bson';
import { AuthEventKind } from '../../auth/internal/AuthEvent';
import { base64Encode } from "../../internal/common/Base64";
import Method from "../../internal/net/Method";
import { StitchAuthDocRequest } from "../../internal/net/StitchAuthDocRequest";
import { StitchAuthRequest } from "../../internal/net/StitchAuthRequest";
import { RebindEventType } from './RebindEvent';
var CoreStitchServiceClientImpl = (function () {
    function CoreStitchServiceClientImpl(requestClient, routes, name) {
        this.serviceField = "service";
        this.argumentsField = "arguments";
        this.requestClient = requestClient;
        this.serviceRoutes = routes;
        this.serviceName = name;
        this.serviceBinders = [];
        this.allocatedStreams = [];
    }
    CoreStitchServiceClientImpl.prototype.callFunction = function (name, args, decoder) {
        return this.requestClient.doAuthenticatedRequestWithDecoder(this.getCallServiceFunctionRequest(name, args), decoder);
    };
    CoreStitchServiceClientImpl.prototype.streamFunction = function (name, args, decoder) {
        var _this = this;
        return this.requestClient.openAuthenticatedStreamWithDecoder(this.getStreamServiceFunctionRequest(name, args), decoder).then(function (newStream) {
            _this.allocatedStreams.push(newStream);
            return newStream;
        });
    };
    CoreStitchServiceClientImpl.prototype.bind = function (binder) {
        this.serviceBinders.push(binder);
    };
    CoreStitchServiceClientImpl.prototype.onRebindEvent = function (rebindEvent) {
        switch (rebindEvent.type) {
            case RebindEventType.AUTH_EVENT:
                var authRebindEvent = rebindEvent;
                if (authRebindEvent.event.kind === AuthEventKind.ActiveUserChanged) {
                    this.closeAllocatedStreams();
                }
                break;
            default:
                break;
        }
        this.serviceBinders.forEach(function (binder) {
            binder.onRebindEvent(rebindEvent);
        });
    };
    CoreStitchServiceClientImpl.prototype.getStreamServiceFunctionRequest = function (name, args) {
        var body = { name: name };
        if (this.serviceName !== undefined) {
            body[this.serviceField] = this.serviceName;
        }
        body[this.argumentsField] = args;
        var reqBuilder = new StitchAuthRequest.Builder();
        reqBuilder
            .withMethod(Method.GET)
            .withPath(this.serviceRoutes.functionCallRoute +
            ("?stitch_request=" + encodeURIComponent(base64Encode(EJSON.stringify(body)))));
        return reqBuilder.build();
    };
    CoreStitchServiceClientImpl.prototype.getCallServiceFunctionRequest = function (name, args) {
        var body = { name: name };
        if (this.serviceName !== undefined) {
            body[this.serviceField] = this.serviceName;
        }
        body[this.argumentsField] = args;
        var reqBuilder = new StitchAuthDocRequest.Builder();
        reqBuilder
            .withMethod(Method.POST)
            .withPath(this.serviceRoutes.functionCallRoute);
        reqBuilder.withDocument(body);
        return reqBuilder.build();
    };
    CoreStitchServiceClientImpl.prototype.closeAllocatedStreams = function () {
        this.allocatedStreams.forEach(function (stream) {
            if (stream.isOpen()) {
                stream.close();
            }
        });
        this.allocatedStreams = [];
    };
    return CoreStitchServiceClientImpl;
}());
export default CoreStitchServiceClientImpl;
//# sourceMappingURL=CoreStitchServiceClientImpl.js.map