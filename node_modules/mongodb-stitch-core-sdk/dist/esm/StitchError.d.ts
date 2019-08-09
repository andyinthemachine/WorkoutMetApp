declare type ErrorConstructor = new (message: string) => Error;
declare const _Error: ErrorConstructor;
export default class StitchError extends _Error {
}
export {};
