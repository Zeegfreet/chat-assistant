
export interface Encrypter<T = object> {
    encrypt(payload: Encrypter.Params<T>, expiresIn?: Encrypter.ExpiresIn): Promise<Encrypter.Result>
}

export namespace Encrypter {
    export type Params<T = object> = T
    export type ExpiresIn = string
    export type Result = string
}