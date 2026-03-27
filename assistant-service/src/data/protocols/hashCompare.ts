
export interface HashCompare {
    compare(password: HashCompare.Password, hash: HashCompare.Hash): Promise<HashCompare.Result>
}

export namespace HashCompare {
    export type Password = string
    export type Hash = string
    export type Result = boolean
}