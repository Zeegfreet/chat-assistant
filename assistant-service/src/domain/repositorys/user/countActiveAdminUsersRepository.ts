
export interface CountActiveAdminUsersRepository {
    count(): Promise<CountActiveAdminUsersRepository.Result>
}

export namespace CountActiveAdminUsersRepository {
    export type Result = number
}