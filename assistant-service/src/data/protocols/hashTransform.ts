
export interface HashTransform {
    hash(password: HashTransform.Params): Promise<HashTransform.Result>
}

export namespace HashTransform {
    export type Params = string
    export type Result = string
}