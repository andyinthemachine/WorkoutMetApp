import CoreStitchServiceClientImpl from "../services/internal/CoreStitchServiceClientImpl";
var CoreStitchAppClient = (function () {
    function CoreStitchAppClient(authRequestClient, routes) {
        this.functionService =
            new CoreStitchServiceClientImpl(authRequestClient, routes.serviceRoutes);
    }
    CoreStitchAppClient.prototype.callFunction = function (name, args, decoder) {
        return this.functionService.callFunction(name, args, decoder);
    };
    return CoreStitchAppClient;
}());
export default CoreStitchAppClient;
//# sourceMappingURL=CoreStitchAppClient.js.map