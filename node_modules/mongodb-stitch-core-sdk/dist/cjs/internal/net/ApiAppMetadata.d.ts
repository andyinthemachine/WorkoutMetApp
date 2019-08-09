export default class ApiAppMetadata {
    static fromJSON(json: object): ApiAppMetadata;
    readonly deploymentModel: string;
    readonly location: string;
    readonly hostname: string;
    constructor(deploymentModel: string, location: string, hostname: string);
    toJSON(): object;
}
