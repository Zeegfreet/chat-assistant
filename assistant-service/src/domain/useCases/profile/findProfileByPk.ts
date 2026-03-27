
export interface FindProfileByPk {
    find(id: FindProfileByPk.UserId): Promise<FindProfileByPk.Result>
}

export namespace FindProfileByPk {
    export type UserId = number
    export type Result = {
        id: number,
        name: string,
        email: string,
    }
}