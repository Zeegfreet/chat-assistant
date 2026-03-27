
export interface Decrypter<T = Record<string, any>> {
    decrypt(payload: Decrypter.Params): Promise<Decrypter.Result<T>>
}

export namespace Decrypter {
    export type Params = string
    export interface onSuccess<T = Record<string, any>> {
        success: true,
        resources: T | null
    }
    export interface onFailed {
        success: false,
        kind: "EXPIRED" | "INVALID"
    }
    export type Result<T = Record<string, any>> = onSuccess<T> | onFailed
}